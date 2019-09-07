import { NextPage } from "next";
import checkLoggedIn from "../auth/checkLoggedIn";
import { withApollo } from "../lib/apollo";

interface IIndexProps {
  loggedInUser: any;
}

const Index: NextPage<IIndexProps> = ({ loggedInUser }) => {
  return <div> {loggedInUser.user.name} </div>;
};

Index.getInitialProps = async (context: any) => {
  const { loggedInUser } = await checkLoggedIn(
    context.apolloClient,
    "cjzlp8q3q002s0750l8ywaiw7"
  );

  return { loggedInUser };
};

export default withApollo(Index);
