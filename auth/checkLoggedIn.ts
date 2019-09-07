import { ApolloClient } from "apollo-boost";
import gql from "graphql-tag";

interface IUserData {
  id: string;
  type: string;
  email: string;
  name: string;
  description: string;
  profile_picture: string;
}

interface IUserVariables {
  id: string;
}

export default async (
  apolloClient: ApolloClient<object>,
  id: string
): Promise<{ loggedInUser: IUserData } | { loggedInUser: {} }> => {
  const GET_USER_QUERY = gql`
    query user($id: ID!) {
      user(id: $id) {
        id
        name
      }
    }
  `;

  try {
    const { data } = await apolloClient.query<IUserData, IUserVariables>({
      query: GET_USER_QUERY,
      variables: {
        id
      }
    });

    return { loggedInUser: data };
  } catch (error) {
    return { loggedInUser: {} };
  }
};
