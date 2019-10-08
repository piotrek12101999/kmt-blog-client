import { useMutation } from "@apollo/react-hooks";
import { omit } from "lodash";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import checkLoggedIn from "../auth/checkLoggedIn";
import Layout from "../components/layout/Layout";
import { withApollo } from "../lib/apollo";
import { SET_LOGGED_IN_USER } from "../lib/clientQueries";
import getUID from "../lib/getUID";
import { IPageContext } from "../models/page.model";
import { IUser } from "../models/user.model";

interface IIndexProps {
  loggedInUser: IUser | {};
}

const Index: NextPage<IIndexProps> = ({ loggedInUser }) => {
  const [setUser] = useMutation(SET_LOGGED_IN_USER);

  useEffect(() => {
    // @ts-ignore
    if (loggedInUser.id) {
      setUser({
        variables: {
          loggedInUser
        }
      });
    }
  }, []);

  return (
    <Layout title="index" description="this is index site">
      <div style={{ paddingTop: 300 }}> lorem*99</div>
      <Link href="/about">
        <a> about </a>
      </Link>
    </Layout>
  );
};

Index.getInitialProps = async ({ req, apolloClient }: IPageContext) => {
  if (req) {
    const loggedInUser = await checkLoggedIn(
      apolloClient,
      getUID(req.headers.cookie || "")
    );
    // @ts-ignore
    const dataToPassDown = omit(loggedInUser.loggedInUser.user, "__typename");
    return { loggedInUser: dataToPassDown };
  }

  return { loggedInUser: {} };
};

export default withApollo(Index);
