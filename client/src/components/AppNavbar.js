import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
import Icon from "@material-ui/core/Icon";
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
    navBar: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    navItem: {
        margin: theme.spacing(1, 4),
        "&:nth-child(4)": {
            marginRight: theme.spacing(1)
        },
        "&:nth-child(3)": {
            margin: theme.spacing(1, 2), // decrease margin for 'Create Poll' button since it has padding
            [theme.breakpoints.down("md")]: {
                margin: theme.spacing(1)
            }
        },
        [theme.breakpoints.down("md")]: {
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
            fontSize: "0.9rem"
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
    },
    avatar: {
        textTransform: "uppercase"
    },
    mobileMenuButton: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        }
    }
}));

function AppNavbar(props) {
    const { open, user } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
    const classes = useStyles();

    const openMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const openMobileMenu = event => {
        setMobileAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMobileClose = () => {
        setMobileAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
                color="inherit"
                elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Link component={RouterLink} underline="none" to="/profile">
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
                    </Link>
                    <IconButton
                        className={classes.mobileMenuButton}
                        aria-label="open mobile menu"
                        aria-controls="mobile-menu"
                        aria-haspopup="true"
                        onClick={openMobileMenu}>
                        <Icon>more_vert</Icon>
                    </IconButton>
                    <Menu
                        id="mobile-menu"
                        anchorEl={mobileAnchorEl}
                        keepMounted
                        open={Boolean(mobileAnchorEl)}
                        onClose={handleMobileClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}>
                        <MenuItem key={1} onClick={handleMobileClose}>
                            <Link
                                component={RouterLink}
                                variant="subtitle1"
                                underline="none"
                                to={{
                                    pathname: "/friends",
                                    state: {
                                        userId: user._id
                                    }
                                }}>
                                Friends
                            </Link>
                        </MenuItem>
                        <MenuItem key={2} onClick={handleMobileClose}>
                            <Link
                                component={RouterLink}
                                variant="subtitle1"
                                underline="none"
                                to={{
                                    pathname: "/friends-polls",
                                    state: {
                                        userId: user._id
                                    }
                                }}>
                                Friends polls
                            </Link>
                        </MenuItem>
                        <MenuItem key={3} onClick={props.togglePollDialog}>
                            Create poll
                        </MenuItem>
                        <MenuItem key={4} onClick={handleMobileClose}>
                            <Link
                                component={RouterLink}
                                underline="none"
                                to="/profile">
                                <Typography variant="subtitle1">
                                    My profile
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem key={5} onClick={handleMobileClose}>
                            <Link
                                component={RouterLink}
                                underline="none"
                                to="/edit-profile">
                                <Typography variant="subtitle1">
                                    Edit profile
                                </Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem key={6} onClick={props.logOut}>
                            Log out
                        </MenuItem>
                    </Menu>

                    <nav className={classes.navBar}>
                        <Link
                            component={RouterLink}
                            variant="subtitle1"
                            underline="none"
                            to={{
                                pathname: "/friends",
                                state: {
                                    userId: user._id
                                }
                            }}
                            className={classes.navItem}>
                            Friends
                        </Link>
                        <Link
                            component={RouterLink}
                            variant="subtitle1"
                            underline="none"
                            to={{
                                pathname: "/friends-polls",
                                state: {
                                    userId: user._id
                                }
                            }}
                            className={classes.navItem}>
                            Friends polls
                        </Link>
                        <Button
                            onClick={props.togglePollDialog}
                            variant="outlined"
                            color="primary"
                            size="small"
                            className={classes.navItem}>
                            Create poll
                        </Button>
                        <Link
                            className={classes.navItem}
                            component={RouterLink}
                            underline="none"
                            to="/profile">
                            <Typography variant="subtitle1">
                                My profile
                            </Typography>
                        </Link>
                        <IconButton
                            className={classes.iconButton}
                            disableFocusRipple
                            disableRipple
                            aria-label="account of current user"
                            aria-controls="app-menu"
                            aria-haspopup="true"
                            onClick={openMenu}
                            color="inherit">
                            {user.avatar ? (
                                <Avatar
                                    alt={`Avatar of user ${user.name}`}
                                    src={user.avatar}
                                />
                            ) : (
                                <Avatar className={classes.avatar}>
                                    {user.name.split(" ")[0][0]}
                                </Avatar>
                            )}
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
                            <MenuItem component={RouterLink} to="/edit-profile">
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
