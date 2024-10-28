// ** MUI Imports
import { Theme } from "@mui/material/styles";

const GlobalStyles = (theme: Theme) => ({
  ".main_body": {
    minHeight: "calc(100vh - 96px)"
  },

  img: {
    maxWidth: "100%",
    height: "auto"
  },
  a: {
    display: "inline-block",
    textDecoration: "none"
  },

  "p:last-child": {
    marginBottom: 0
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyle: "none"
  },
  ".MuiContainer-root": {
    maxWidth: "1170px",
    padding: "0 10px",
    "@media (min-width: 1200px)": {
      maxWidth: "1170px"
    },
    "&.cus_container": {
      "@media (min-width: 1400px)": {
        maxWidth: "1470px"
      }
    }
  }
  // Additional styles here
});

export default GlobalStyles;
