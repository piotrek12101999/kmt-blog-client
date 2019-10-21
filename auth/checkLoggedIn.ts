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
): Promise<IUserData | {}> => {
  const GET_USER_QUERY = gql`
    query user($id: ID!) {
      user(id: $id) {
        id
        name
        email
        profile_picture
        description
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

    return data;
  } catch (error) {
    return {};
  }
};
