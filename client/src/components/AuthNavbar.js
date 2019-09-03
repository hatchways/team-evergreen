import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Link } from "@material-ui/core";
import logo from "../images/icons/logo.png";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    header: {
        backgroundColor: "transparent",
        padding: theme.spacing(4)
    },
    toolbar: {
        justifyContent: "space-between"
    },
    button: {
        color: "#fff",
        border: "2px solid #ffff",
        marginRight: theme.spacing(5)
    },
    logo: {
        height: "60px",
        width: "60px"
    }
}));

function AuthNavbar(props) {
    console.log(props.target);
    const classes = useStyles();
    const buttonText = props.target === "signup" ? "Sign up" : "Log in";

    return (
        <div className={classes.root}>
            <AppBar className={classes.header} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Link href="./">
                        <img
                            className={classes.logo}
                            alt="App logo"
                            src={logo}
                        />
                    </Link>
                    <Button
                        href={`./${props.target}`}
                        size="large"
                        className={classes.button}
                        variant="outlined">
                        {buttonText}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AuthNavbar;
