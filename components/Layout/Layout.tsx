import Container from "@material-ui/core/Container";
import Head from "next/head";
import { useState } from "react";
import Login from "../auth/Login/Login";
import Navbar from "../Navbar/Navbar";

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, title, description }) => {
  const [openLoginDialog, setLoginDialogOpened] = useState<boolean>(false);

  const handleLoginOpen = (): void => setLoginDialogOpened(true);

  const handleLoginClose = (): void => setLoginDialogOpened(false);

  return (
    <>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
      </Head>
      <Navbar handleLoginOpen={handleLoginOpen} />
      <Container className="content">{children}</Container>
      <Login open={openLoginDialog} handleLoginClose={handleLoginClose} />
    </>
  );
};

export default Layout;
