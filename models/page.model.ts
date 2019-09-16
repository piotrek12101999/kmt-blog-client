import { ApolloClient } from "apollo-boost";
import { NextPageContext } from "next";

export interface IPageContext extends NextPageContext {
  apolloClient: ApolloClient<object>;
}
