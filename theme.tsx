import red from "@material-ui/core/colors/red";
import { createMuiTheme, Theme } from "@material-ui/core/styles";

// Create a theme instance.
const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    // tslint:disable-next-line:object-literal-sort-keys
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  },
  typography: {
    fontFamily: "Source Sans Pro, sans-serif"
  }
});

export default theme;
