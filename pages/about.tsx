import gql from "graphql-tag";
import Link from "next/link";
import checkLoggedIn from "../auth/checkLoggedIn";
import { withApollo } from "../lib/apollo";
import getUID from "../lib/getUID";

const GET_UID = gql`
  {
    UserLocalData @client
  }
`;

const About = () => {
  return (
    <div>
      test
      <br />
      <Link href="/">
        <a> Next Page </a>
      </Link>
    </div>
  );
};

About.getInitialProps = async ({ req, apolloClient }: any) => {
  if (req) {
    apolloClient.writeData({
      data: { UserLocalData: getUID(req.headers.cookie) }
    });
  }

  const { data } = await apolloClient.query({ query: GET_UID });
  const loggedInUser = await checkLoggedIn(apolloClient, data.UserLocalData);

  return { loggedInUser };
};

export default withApollo(About);
