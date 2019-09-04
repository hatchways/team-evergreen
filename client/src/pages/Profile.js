import React, { Component } from "react";
import axios from "axios";
import clsx from "clsx";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import PollCard from "../components/PollCard";
import ListCard from "../components/ListCard";
import {
    CssBaseline,
    Drawer,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Badge,
    AppBar,
    Toolbar,
    Divider,
    IconButton,
    Container,
    Grid,
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
            user: null,
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
        const { id } = this.props.user;

        // fetch user data from database:
        axios
            .get(`api/users/${id}`)
            .then(response => this.setState({ user: response.data }))
            .catch(err => console.log(err));

        // get users:
        this.fetchUsers();
    }

    fetchUsers = () => {
        // fetch all users and populate state
        axios
            .get(`api/users/`)
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.log(err));
    };

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
                    <div className={classes.toolbarIcon}>
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
                        {users.map(user => {
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
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            <Grid container spacing={4} item xs={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        Polls
                                    </Typography>
                                </Grid>
                                {[1, 2, 3].map((card, i) => (
                                    <PollCard key={i} card={card} />
                                ))}
                            </Grid>
                            <Grid container spacing={4} item xs={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        Friend lists
                                    </Typography>
                                </Grid>
                                {[1, 2, 3].map((card, i) => (
                                    <ListCard key={i} card={card} />
                                ))}
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(Profile);
