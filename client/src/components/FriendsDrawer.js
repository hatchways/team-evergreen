import React from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Drawer,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Badge,
    Divider,
    IconButton,
    Icon
} from "@material-ui/core";

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
        whiteSpace: "nowrap",
        width: "240px",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: "70px"
        }
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    }
}));

function FriendsDrawer(props) {
    const { open, toggleDrawer } = props;
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(
                    classes.drawerPaper,
                    !open && classes.drawerPaperClose
                )
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}>
                    <Icon>{open ? "chevron_left" : "chevron_right"}</Icon>
                </IconButton>
            </div>
            <Divider />
            <List
                dense
                component="nav"
                aria-labelledby="friends-list-title"
                subheader={
                    <ListSubheader
                        className={clsx(
                            classes.subtitle,
                            !open && classes.collapsed
                        )}
                        component="div"
                        id="friends-list-title">
                        Friends
                    </ListSubheader>
                }>
                {props.users.map(user => {
                    return (
                        <ListItem button key={user.id}>
                            <ListItemAvatar>
                                <StyledBadge
                                    variant="dot"
                                    overlap="circle"
                                    color="secondary">
                                    <Avatar
                                        alt={`Avatar of ${user.name}`}
                                        src=""
                                    />
                                </StyledBadge>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default FriendsDrawer;
