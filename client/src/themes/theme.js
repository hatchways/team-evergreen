import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: '"Roboto"'
    },
    palette: {
        primary: {
            main: "#000000"
        },
        secondary: {
            main: "#5DCD57"
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
        },
        MuiTypography: {
            h5: {
                fontWeight: 500
            }
        }
    }
});
