import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { Slide, useScrollTrigger } from "@material-ui/core";
import { ApolloClient } from "apollo-boost";
import cookie from "cookie";
import { useState } from "react";
import { GET_LOGGED_IN_USER } from "../../lib/clientQueries";
import Container from "../container/Container";
import Avatar from "./avatar/Avatar";
import Login from "./login/Login";
import Register from "./register/Register";

interface IProps {
  children: React.ReactElement;
}

function HideOnScroll({ children }: IProps): JSX.Element {
  const trigger: boolean = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar: React.FC = () => {
  const client: ApolloClient<object> = useApolloClient();
  const [openLogin, setLoginOpen] = useState<boolean>(false);
  const [openRegister, setRegisterOpen] = useState<boolean>(false);
  const { data } = useQuery(GET_LOGGED_IN_USER);

  const handleOpenLogin = (): void => setLoginOpen(true);

  const handleCloseLogin = (): void => setLoginOpen(false);

  const handleOpenRegister = (): void => setRegisterOpen(true);

  const handleCloseRegister = (): void => setRegisterOpen(false);

  const handleLogOut = async () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1
    });
    document.cookie = cookie.serialize("uid", "", {
      maxAge: -1
    });
    await client.cache.reset();
    await client.resetStore();
  };

  return (
    <>
      <HideOnScroll>
        <nav className="navbar">
          <Container>
            <div className="navbar__wrapper">
              <div className="navbar__wrapper__logo">Klub Młodego Technika</div>
              <div className="navbar__wrapper__buttons">
                <div className="navbar__wrapper__buttons__button">
                  <span>O nas </span>
                </div>
                <div className="navbar__wrapper__buttons__button">
                  <span>Galeria </span>
                </div>
                <div className="navbar__wrapper__buttons__button">
                  <span> Blog </span>
                </div>
                {data.loggedInUser.id !== null ? (
                  <Avatar
                    loggedInUser={data.loggedInUser}
                    handleLogOut={handleLogOut}
                  />
                ) : (
                  <>
                    <div
                      onClick={handleOpenLogin}
                      className="navbar__wrapper__buttons__button--login"
                    >
                      Zaloguj się
                    </div>
                    <div
                      onClick={handleOpenRegister}
                      className="navbar__wrapper__buttons__button--register"
                    >
                      Rejestracja
                    </div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </nav>
      </HideOnScroll>
      <Login open={openLogin} closeLogin={handleCloseLogin} />
      <Register open={openRegister} closeRegister={handleCloseRegister} />
      <style jsx={true}>{`
        .navbar {
          width: 100%;
          height: 64px;
          position: fixed;
          display: flex;
          align-items: center;
          background-color: white;
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }

        .navbar .navbar__wrapper {
          display: flex;
          justify-content: space-between;
        }

        .navbar .navbar__wrapper .navbar__wrapper__logo {
          font-size: 23px;
          font-weight: 700;
        }

        .navbar .navbar__wrapper .navbar__wrapper__logo:hover {
          cursor: pointer;
        }

        .navbar .navbar__wrapper .navbar__wrapper__buttons {
          position: relative;
          display: flex;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button {
          color: #666666;
          padding: 8px 16px;
          transition: color 0.15s ease-in;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button
          span {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button:hover {
          cursor: pointer;
          color: black;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button--login {
          color: #0070f3;
          padding: 8px 16px;
          transition: all 0.15s ease-in;
          border: solid 1px #0070f3;
          border-radius: 4px;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button--login:hover {
          color: #0076ffe6;
          border: solid 1px #0076ffe6;
          cursor: pointer;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button--register {
          margin-left: 10px;
          color: white;
          box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
          background-color: #0070f3;
          display: flex;
          align-items: center;
          border-radius: 4px;
          padding: 8px 16px;
          transition: all 0.15s ease-in;
        }

        .navbar
          .navbar__wrapper
          .navbar__wrapper__buttons
          .navbar__wrapper__buttons__button--register:hover {
          cursor: pointer;
          background-color: #0076ffe6;
        }
      `}</style>
    </>
  );
};

export default Navbar;
