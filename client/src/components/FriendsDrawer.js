import React from "react";
import clsx from "clsx";
import renderAvatar from "../utils/renderAvatar";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";

import { socket } from "../utils/setSocketConnection";

const StyledBadge = withStyles(theme => ({
    badge: {
        top: "5px",
        right: "5px",
        backgroundColor: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid #44b700",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}))(Badge);

const useStyles = makeStyles(theme => ({
    subtitle: {
        fontWeight: "600",
        transition: theme.transitions.create("font-size", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    collapsed: {
        fontSize: "0.7rem"
    },
    drawerPaper: {
        position: "relative",
        width: "240px",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        height: "100vh",
        whiteSpace: "normal"
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("xs")]: {
            width: "70px"
        }
    },
    toolbar: theme.mixins.toolbar,
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        ...theme.mixins.toolbar
    },
    avatar: {
        textTransform: "uppercase"
    },
    arrowIcon: {
        margin: "0 0 0 auto",
        [theme.breakpoints.up("xs")]: {
            padding: "20px"
        }
    }
}));

function FriendsDrawer(props) {
    const {
        user,
        drawerIsOpen,
        toggleDrawer,
        mobileDrawerIsOpen,
        toggleMobileDrawer
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [friends, setFriends] = React.useState([]);

    React.useEffect(() => {
        setFriends(user.friends);
        console.log("Current user id: ", user._id);

        // listen to new users joining the app:
        socket.on("user_joined", userId => {
            console.log("New user joined the app!");

            const updatedFriends = friends.map(friend => {
                // Find a friend with the matching userId
                if (friend._id === userId) {
                    friend.online = true; // overwrite status key
                }

                // Leave every other friend unchanged
                return friend;
            });

            setFriends(updatedFriends);
        });

        // listen to users leaving the app:
        socket.on("user_left", userId => {
            console.log("User has left the app!");

            const updatedFriends = friends.map(friend => {
                // Find a friend with the matching userId
                if (friend._id === userId) {
                    friend.online = false; // overwrite status key
                }

                // Leave every other friend unchanged
                return friend;
            });

            setFriends(updatedFriends);
        });

        // cancel event listening
        return () => {
            socket.off("user_joined");
            socket.off("user_left");
            socket.off("friends_changed");
        };
    }, [friends, user.friends, user._id]);

    const friendsList = (
        <List
            dense
            component="nav"
            aria-labelledby="friends-list-title"
            subheader={
                <ListSubheader
                    className={clsx(
                        classes.subtitle,
                        !drawerIsOpen && classes.collapsed
                    )}
                    component="div"
                    id="friends-list-title">
                    Friends
                </ListSubheader>
            }>
            {friends.map(friend => {
                return (
                    <Link
                        key={friend._id}
                        underline="none"
                        component={RouterLink}
                        to={{
                            pathname: `/user/${friend._id}`,
                            state: {
                                user: friend,
                                users: props.users
                            }
                        }}>
                        <ListItem button>
                            <ListItemAvatar>
                                <StyledBadge
                                    invisible={!friend.online}
                                    variant="dot"
                                    overlap="circle"
                                    color="secondary">
                                    {renderAvatar(friend, classes)}
                                </StyledBadge>
                            </ListItemAvatar>
                            <ListItemText primary={friend.name} />
                        </ListItem>
                    </Link>
                );
            })}
        </List>
    );

    const mobileDrawer = (
        <>
            <div className={classes.toolbar} />
            <Divider />
            {friendsList}
        </>
    );

    const desktopDrawer = (
        <>
            <div className={classes.toolbarIcon}>
                <IconButton
                    className={classes.arrowIcon}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}>
                    <Icon>
                        {drawerIsOpen ? "chevron_left" : "chevron_right"}
                    </Icon>
                </IconButton>
            </div>
            <Divider />
            {friendsList}
        </>
    );

    return (
        <>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    classes={{
                        paper: clsx(classes.drawerPaper)
                    }}
                    open={mobileDrawerIsOpen}
                    onClose={toggleMobileDrawer}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}>
                    {mobileDrawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !drawerIsOpen && classes.drawerPaperClose
                        )
                    }}
                    variant="permanent"
                    open={drawerIsOpen}>
                    {desktopDrawer}
                </Drawer>
            </Hidden>
        </>
    );
}

export default FriendsDrawer;
