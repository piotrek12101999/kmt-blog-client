import Head from "next/head";
import { IUser } from "../../models/user.model";
import Container from "../container/Container";
import Navbar from "../navbar/Navbar";

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
  loggedInUser: {
    user: IUser;
  };
}

const Layout: React.FC<ILayoutProps> = ({
  children,
  title,
  description,
  loggedInUser
}) => {
  return (
    <>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
      </Head>
      <Navbar loggedInUser={loggedInUser} />
      <Container> {children} </Container>
      <style global={true} jsx={true}>{`
        body {
          margin: 0;
          padding: 0;
          font-family: "Source Sans Pro", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
};

export default Layout;
