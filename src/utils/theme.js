import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
      dark: "#0c2531",
      contrastText: "#bc8f8f",
    },
    secondary: {
      main: "#19857b",
      dark: "#0f1219",
      light: "#ececec",
    },
    background: {
      default: "#040d11",
    },
  },
});

export default theme;
