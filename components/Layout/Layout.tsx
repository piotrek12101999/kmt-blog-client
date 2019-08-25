import Container from "@material-ui/core/Container";
import Head from "next/head";
import Navbar from "../Navbar/Navbar";

interface ILayoutProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, title, description }) => (
  <>
    <Head>
      <title> {title} </title>
      <meta name="description" content={description} />
    </Head>
    <Navbar />
    <Container className="content">{children}</Container>
  </>
);

export default Layout;
