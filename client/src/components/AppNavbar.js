import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
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
        textTransform: "capitalize",
        "&:hover": {
            textDecoration: "none"
        }
    },
    navItem: {
        margin: theme.spacing(1, 3)
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
    const { open, user } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        console.log("event.currentTarget: ", event.currentTarget);
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
                            className={clsx(classes.link, classes.navItem)}>
                            Friends lists
                        </Link>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className={classes.navItem}>
                            Create poll
                        </Button>
                        <IconButton
                            className={classes.iconButton}
                            disableFocusRipple
                            disableRipple
                            aria-label="account of current user"
                            aria-controls="app-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            color="inherit">
                            <Avatar
                                alt={`Avatar of ${user ? user.name : "user"}`}
                                src={user && user.avatar}
                            />
                            <Typography variant="subtitle1">
                                My profile
                            </Typography>
                        </IconButton>
                        <Menu
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            id="app-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem>
                                <ListItemText primary="Edit profile" />
                            </MenuItem>
                            <MenuItem onClick={props.logOut}>
                                <ListItemText primary="Log out" />
                            </MenuItem>
                        </Menu>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppNavbar;
