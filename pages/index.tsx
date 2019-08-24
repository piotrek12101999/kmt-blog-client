import { useQuery } from "@apollo/react-hooks";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import React from "react";
import Link from "../components/Link";

export const test = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export default function App() {
  const { loading, data }: { loading: boolean; data: any } = useQuery(test, {
    notifyOnNetworkStatusChange: true
  });

  if (loading) {
    return <div> data </div>;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography
          className="test"
          variant="h4"
          component="h1"
          gutterBottom={true}
        >
          Test
        </Typography>
        <Link href="about" color="secondary">
          Go to the about page
        </Link>
        <div className="test">
          {data.users.map(
            (
              user: { name: React.ReactNode },
              index: string | number | undefined
            ) => (
              <div key={index}> {user.name} </div>
            )
          )}
        </div>
      </Box>
    </Container>
  );
}
