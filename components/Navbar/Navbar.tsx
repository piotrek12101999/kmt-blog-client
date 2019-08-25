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

const Navbar: React.FC<{}> = () => {
  return (
    <>
      <HideOnScroll>
        <header className="navbar">
          <div className="navbar__logo" />
          <div className="navbar__buttons" />
        </header>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
