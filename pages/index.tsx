import gql from "graphql-tag";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import checkLoggedIn from "../auth/checkLoggedIn";
import Layout from "../components/layout/Layout";
import { withApollo } from "../lib/apollo";
import getUID from "../lib/getUID";
import { IPageContext } from "../models/page.model";

const GET_UID = gql`
  {
    UserLocalData @client
  }
`;

interface IIndexProps {
  loggedInUser: any;
}

const Index: NextPage<IIndexProps> = ({ loggedInUser }) => {
  return (
    <Layout
      title="index"
      description="this is index site"
      loggedInUser={loggedInUser}
    >
      <div style={{ marginBottom: 300 }}> lorem*99 </div>
      <Link href="/about">
        <a> about </a>
      </Link>
    </Layout>
  );
};

Index.getInitialProps = async ({ req, apolloClient }: IPageContext) => {
  if (req) {
    apolloClient.writeData({
      // @ts-ignore
      data: { UserLocalData: getUID(req.headers.cookie) }
    });
  }
  const { data } = await apolloClient.query({ query: GET_UID });

  const { loggedInUser } = await checkLoggedIn(
    apolloClient,
    data.UserLocalData
  );

  return { loggedInUser };
};

export default withApollo(Index);
