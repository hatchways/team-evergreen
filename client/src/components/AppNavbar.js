import React from "react";
import clsx from "clsx";
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

const drawerWidth = 240;
const closedDrawerWidth = 70;

const useStyles = makeStyles(theme => ({
    appBar: {
        padding: `0 ${theme.spacing(2)}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        width: `calc(100% - ${closedDrawerWidth}px)`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    homeButtonHidden: {
        visibility: "hidden"
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
    const { open } = props;
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
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
                color="inherit"
                elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="go to home page"
                        className={clsx(open && classes.homeButtonHidden)}>
                        <img
                            className={classes.logo}
                            alt="App logo"
                            src={logo}
                        />
                    </IconButton>
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
