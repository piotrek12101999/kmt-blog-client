import { Typography } from "@material-ui/core";
import Typist from "react-typist";

const Start: React.FC<{}> = () => {
  return (
    <div className="start-section">
      <Typography
        variant="h2"
        component="h1"
        className="start-section__typography"
      >
        <Typist
          cursor={{
            hideWhenDone: true,
            hideWhenDoneDelay: 500
          }}
        >
          Najlepsi{" "}
          <span className="start-section__typography--color">nauczyciele</span>
          <Typist.Backspace count={11} delay={1000} />
          <Typist.Delay ms={750} />
          <span className="start-section__typography--color">koledzy</span>
          <Typist.Backspace count={9} delay={1000} />
          <Typist.Delay ms={750} />
          ze <span className="start-section__typography--color">miejsce</span>
        </Typist>
        do zaczęcia swojej przygody z
        <span className="start-section__typography--color"> technologią </span>
      </Typography>
    </div>
  );
};

export default Start;
