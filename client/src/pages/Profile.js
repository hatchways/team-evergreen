import React, { Component } from "react";
import clsx from "clsx";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import {
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Badge,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
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


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: null,
            polls: null,
            open: true,
            users: [
                {
                    name: "Harry Potter",
                    id: 1
                },
                {
                    name: "Ron Weasley",
                    id: 2
                },
                {
                    name: "Hermione Granger",
                    id: 3
                },
                {
                    name: "Severus Snape",
                    id: 4
                },
                {
                    name: "Albus Dumbledore",
                    id: 5
                },
                {
                    name: "Professor Lupin",
                    id: 6
                }
            ] // temp fake data
        };
    }

    componentDidMount() {
        // get users, polls and lists
    }

    toggleDrawer = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const { classes } = this.props;
        const { open, users } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute">
                    <Toolbar className={classes.toolbar}></Toolbar>
                </AppBar>

                <div className={classes.appBarSpacer} />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        )
                    }}
                    open={open}>
                    <div className={classes.toolbar}>
                        <Typography
                            variant="subtitle1"
                            component="h2"
                            className={classes.subtitle}>
                            {open ? "Friends" : ""}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.toggleDrawer}>
                            <Icon>
                                {open ? "chevron_left" : "chevron_right"}
                            </Icon>
                        </IconButton>
                    </div>
                    <Divider />
                    <List dense>
                        {users.map(user => {
                            return (
                                <ListItem key={user.id}>
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
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper></Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper></Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(Profile);
