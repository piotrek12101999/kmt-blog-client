import gql from "graphql-tag";

export const GET_LOGGED_IN_USER = gql`
  query {
    loggedInUser @client {
      id
      name
      email
      profile_picture
      description
    }
  }
`;

export const SET_LOGGED_IN_USER = gql`
  mutation setLoggedInUser($loggedInUser: LoggedInUser!) {
    setLoggedInUser(loggedInUser: $loggedInUser) @client
  }
`;
