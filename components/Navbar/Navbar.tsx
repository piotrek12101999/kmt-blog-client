import { Button, Container } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

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

interface INavbarProps {
  handleLoginOpen: any;
}

const Navbar: React.FC<INavbarProps> = ({ handleLoginOpen }) => {
  return (
    <>
      <HideOnScroll>
        <header className="navbar">
          <Container>
            <div className="navbar__wrapper">
              <div className="navbar__wrapper__logo">Klub Młodego Technika</div>
              <div className="navbar__wrapper__buttons">
                <Button className="navbar__wrapper__buttons__button">
                  O nas
                </Button>
                <Button className="navbar__wrapper__buttons__button">
                  Galeria
                </Button>
                <Button className="navbar__wrapper__buttons__button">
                  Blog
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="navbar__wrapper__buttons__button"
                  onClick={handleLoginOpen}
                >
                  Log in
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className="navbar__wrapper__buttons__button"
                >
                  Rejestracja
                </Button>
              </div>
            </div>
          </Container>
        </header>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
