import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: '"Montserrat", sans-serif'
    },
    palette: {
        primary: {
            main: "#000000"
        },
        secondary: {
            main: "#62CD4D"
        },
        error: {
            main: "#d8000c"
        },
        background: {
            default: "#f6f6f6"
        }
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "20px"
            },
            sizeLarge: {
                padding: "8px 44px"
            }
        }
    }
});
