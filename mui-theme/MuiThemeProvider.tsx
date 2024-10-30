import React, { useMemo } from "react";

// material-ui
import CssBaseline from "@mui/material/CssBaseline";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/system";
import { MuiThemeOptions } from "./_muiTheme";
import GlobalStyling from "./globalStyles";

// const ThemeComponent = (props: Props) => {
//   // ** Props
//   const { settings, children } = props

//   // ** Pass merged ThemeOptions (of core and user) to createTheme function
//   let theme = createTheme(themeOptions(settings, 'light'))

//   // ** Set responsive font sizes to true
//   if (themeConfig.responsiveFontSizes) {
//     theme = responsiveFontSizes(theme)
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <GlobalStyles styles={() => GlobalStyling(theme) as any} />
//       {children}
//     </ThemeProvider>
//   )
// }

// Mui theme set up provider for whole application

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeOptions = useMemo(() => {
    return MuiThemeOptions("light");
  }, []);

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme) as any} />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
