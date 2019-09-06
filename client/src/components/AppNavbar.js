import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Link,
    Menu,
    MenuItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import logo from "../images/icons/logo.png";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    header: {
        padding: `0 ${theme.spacing(2)}px`,
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    link: {
        margin: theme.spacing(1, 1.5),
        textTransform: "capitalize",
        "&:hover": {
            textDecoration: "none"
        }
    },
    toolbar: {
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    logo: {
        height: "40px",
        width: "40px"
    },
    iconButton: {
        "&:hover": {
            backgroundColor: "inherit"
        },
        "& .MuiAvatar-root": {
            marginRight: theme.spacing(1)
        }
    }
}));

function AppNavbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color="inherit" elevation={0} className={classes.header}>
                <Toolbar className={classes.toolbar}>
                    <Link href="./">
                        <img
                            className={classes.logo}
                            alt="App logo"
                            src={logo}
                        />
                    </Link>

                    <nav>
                        <Link
                            variant="subtitle1"
                            color="textPrimary"
                            href="#"
                            className={classes.link}>
                            Opinions
                        </Link>
                        <IconButton
                            className={classes.iconButton}
                            disableFocusRipple
                            disableRipple
                            aria-label="account of current user"
                            aria-controls="app-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            color="inherit">
                            <Avatar alt="User avatar" />
                            <Typography variant="subtitle1">
                                My profile
                            </Typography>
                        </IconButton>
                        <Menu
                            id="app-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem>
                                <ListItemText primary="Settings" />
                            </MenuItem>
                            <MenuItem>
                                <ListItemText primary="Sign out" />
                            </MenuItem>
                        </Menu>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppNavbar;
