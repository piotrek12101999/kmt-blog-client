import Container from "@material-ui/core/Container";
import Head from "next/head";
import { useState } from "react";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Navbar from "../Navbar/Navbar";

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, title, description }) => {
  const [openLoginDialog, setLoginDialogOpened] = useState<boolean>(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

  const handleLoginOpen = (): void => setLoginDialogOpened(true);

  const handleLoginClose = (): void => setLoginDialogOpened(false);

  const handleRegisterOpen = (): void => setOpenRegisterDialog(true);

  const handleRegisterClose = (): void => setOpenRegisterDialog(false);

  return (
    <>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
      </Head>
      <Navbar
        handleLoginOpen={handleLoginOpen}
        handleRegisterOpen={handleRegisterOpen}
      />
      <Container className="content">{children}</Container>
      <Login open={openLoginDialog} handleLoginClose={handleLoginClose} />
      <Register
        open={openRegisterDialog}
        handleRegisterClose={handleRegisterClose}
      />
    </>
  );
};

export default Layout;
