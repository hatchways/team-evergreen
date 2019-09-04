import React, { Component } from "react";
import axios from "axios";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import FriendsDrawer from "../components/FriendsDrawer";
import PoolCard from "../components/PoolCard";
import ListCard from "../components/ListCard";
import {
    CssBaseline,
    Typography,
    AppBar,
    Toolbar,
    Button,
    Container,
    Grid
} from "@material-ui/core";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            lists: null,
            pools: null,
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

    createPool = () => {
        // create new pool
    };

    createFriendList = () => {
        // create new list
    };

    render() {
        const { classes } = this.props;
        const { users } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute">
                    <Toolbar className={classes.toolbar}></Toolbar>
                </AppBar>

                <FriendsDrawer users={users} />
                <div className={classes.appBarSpacer} />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            <Grid container spacing={4} item xs={12}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between">
                                    <Grid item>
                                        <Typography variant="h6" component="h2">
                                            Pools
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            onClick={this.createPool}
                                            variant="contained"
                                            color="primary"
                                            size="medium">
                                            Create pool
                                        </Button>
                                    </Grid>
                                </Grid>
                                {[1, 2, 3].map((card, i) => (
                                    <PoolCard key={i} card={card} />
                                ))}
                            </Grid>
                            <Grid container spacing={4} item xs={12}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between">
                                    <Grid item>
                                        <Typography variant="h6" component="h2">
                                            Friend lists
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            onClick={this.createFriendList}
                                            variant="contained"
                                            color="primary"
                                            size="medium">
                                            Create list
                                        </Button>
                                    </Grid>
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
