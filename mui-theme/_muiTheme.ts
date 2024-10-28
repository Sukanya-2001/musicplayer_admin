/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable mui-path-imports/mui-path-imports */
import { PaletteMode } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import pallete from "./_muiPalette";

/**
 * The function `MuiThemeOptions` returns a configuration object for the Material-UI theme based on the
 * provided mode (light or dark) and includes customizations for various components and typography.
 * @param {PaletteMode} mode - The `mode` parameter is of type `PaletteMode` and is used to determine
 * the color palette mode for the theme. The `PaletteMode` type can have two possible values: "light"
 * or "dark".
 * @returns The function `MuiThemeOptions` returns a `ThemeOptions` object.
 */
export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: pallete(mode),
    typography: {
      fontFamily: ["Roboto"].join(","),
      fontSize: 16,
      h1: {
        fontSize: "67px",
        lineHeight: "1.1em",
        fontWeight: "700",
        fontFamily: "Cinzel",
        "@media(max-width:991px)": {
          fontSize: "22px",
          lineHeight: "1.1em"
        }
      },
      h2: {
        fontSize: "106px",
        lineHeight: "1.1em",
        fontWeight: "400",
        fontFamily: "Cinzel",
        "@media(max-width:991px)": {
          fontSize: "22px",
          lineHeight: "26px"
        }
      },
      h3: {
        fontSize: "20px",
        lineHeight: "1.1em",
        fontWeight: "700",
        fontFamily: "Cinzel",
        "@media(max-width:991px)": {
          fontSize: "18px",
          lineHeight: "1.1em"
        }
      },
      h4: {
        fontSize: "18px",
        lineHeight: "1.3",
        fontWeight: "500",
        fontFamily: "Cinzel",
        "@media(max-width:991px)": {
          fontSize: "16px",
          lineHeight: "1.3"
        }
      },
      h5: {
        fontSize: "15px",
        lineHeight: "1.4",
        fontWeight: "500",
        fontFamily: "Cinzel",
        "@media(max-width:991px)": {
          fontSize: "12px",
          lineHeight: "1.4"
        }
      },
      h6: {
        fontSize: "12px",
        lineHeight: "1.5",
        fontWeight: "500",
        fontFamily: "Cinzel",
        "@media(max-width:991px)": {
          fontSize: "12px",
          lineHeight: "1.5"
        }
      },
      body1: {
        fontSize: "16px",
        lineHeight: "1.5em",
        color: "#8F98A8"
      },
      body2: {
        fontSize: "12px",
        lineHeight: "1.5em",
        color: "#8F98A8"
      },
      caption: {
        fontSize: "14px",
        lineHeight: "1.5em",
        color: "#8F98A8"
      }
    },
    shadows: [
      "none",
      "0px 2px 4px 0px rgba(47, 43, 61, 0.12)",
      "0px 2px 6px 0px rgba(47, 43, 61, 0.14)",
      "0px 3px 8px 0px rgba(47, 43, 61, 0.14)",
      "0px 3px 9px 0px rgba(47, 43, 61, 0.15)",
      "0px 4px 10px 0px rgba(47, 43, 61, 0.15)",
      "0px 4px 11px 0px rgba(47, 43, 61, 0.16)",
      "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
      "0px 4px 13px 0px rgba(47, 43, 61, 0.18)",
      "0px 5px 14px 0px rgba(47, 43, 61, 0.18)",
      "0px 5px 15px 0px rgba(47, 43, 61, 0.2)",
      "0px 5px 16px 0px rgba(47, 43, 61, 0.2)",
      "0px 6px 17px 0px rgba(47, 43, 61, 0.22)",
      "0px 6px 18px 0px rgba(47, 43, 61, 0.22)",
      "0px 6px 19px 0px rgba(47, 43, 61, 0.24)",
      "0px 7px 20px 0px rgba(47, 43, 61, 0.24)",
      "0px 7px 21px 0px rgba(47, 43, 61, 0.26)",
      "0px 7px 22px 0px rgba(47, 43, 61, 0.26)",
      "0px 8px 23px 0px rgba(47, 43, 61, 0.28)",
      "0px 8px 24px 6px rgba(47, 43, 61, 0.28)",
      "0px 9px 25px 0px rgba(47, 43, 61, 0.3)",
      "0px 9px 26px 0px rgba(47, 43, 61, 0.32)",
      "0px 9px 27px 0px rgba(47, 43, 61, 0.32)",
      "0px 10px 28px 0px rgba(47, 43, 61, 0.34)",
      "0px 10px 30px 0px rgba(47, 43, 61, 0.34)"
    ],

    components: {
      MuiSkeleton: {
        defaultProps: {
          animation: "wave"
        }
      },
      MuiCard: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              borderRadius: "8px",
              boxShadow: `0px 4px 24px 0px ${theme.palette.background.paper}`
            };
          }
        }
      },

      MuiMenuItem: {
        styleOverrides: {
          root: () => {
            return {
              "@media(max-width:991px)": {
                minHeight: "20px"
              }
            };
          }
        }
      },
      MuiMenu: {
        defaultProps: {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          PaperProps: {
            elevation: 0
          }
        },
        styleOverrides: {
          paper: ({ theme }) => {
            return {
              overflow: "visible !important",
              filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))",
              marginTop: "6px",

              "@media(max-width:991px)": {
                marginTop: "0"
              }
            };
          },
          list: () => {
            return {
              paddingTop: "4px",
              paddingBottom: "4px"
            };
          }
        }
      },
      MuiButton: {
        styleOverrides: {},
        defaultProps: {
          disableElevation: true
        }
      },

      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backdropFilter: "blur(4px)"
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: ({ theme }) => ({
            backgroundColor: theme?.palette?.primary.main
          })
        }
      }
    }
  };
};
