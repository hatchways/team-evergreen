// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
import axios from "axios";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import AddFriendList from "../components/AddFriendList";
import PollCard from "../components/PollCard";
import ListCard from "../components/ListCard";
import {
    CssBaseline,
    Typography,
    Button,
    Container,
    Grid
} from "@material-ui/core";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            lists: [],
            polls: [],
            drawerIsOpen: true,
            users: []
        };
    }

    componentDidMount() {
        const { id } = this.props.user;

        // fetch user data from database:
        axios
            .get(`api/users/user/${id}`)
            .then(response => {
                this.setState({
                    user: response.data,
                    lists: response.data.lists,
                    polls: response.data.polls
                });
            })
            .catch(err => console.log(err));

        // get all users:
        this.fetchUsers();
    }

    fetchUsers = () => {
        // fetch all users and populate state
        axios
            .get("api/users/")
            .then(response => {
                // exclude current user from list of all users:
                const users = response.data.filter(
                    user => user._id !== this.props.user.id
                );
                this.setState({ users });
            })
            .catch(err => console.log(err));
    };

    addNewPoll = newPoll => {
        // add new poll
    };

    addNewList = newList => {
        this.setState({ lists: this.state.lists.concat(newList) });
    };

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    };

    render() {
        const { classes } = this.props;
        const { users, polls, lists, drawerIsOpen } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />

                <AppNavbar open={drawerIsOpen} />

                <FriendsDrawer
                    users={users}
                    open={drawerIsOpen}
                    toggleDrawer={this.toggleDrawer}
                />
                <div className={classes.appBarSpacer} />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            <Grid
                                container
                                spacing={4}
                                item
                                xs={12}
                                className={classes.fixedHeightContainer}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between">
                                    <Grid item>
                                        <div>
                                            <Typography
                                                display="inline"
                                                variant="h6"
                                                component="h2"
                                                className={classes.title}>
                                                Polls
                                            </Typography>
                                            <Typography
                                                display="inline"
                                                variant="subtitle1"
                                                component="h3">
                                                ({polls ? polls.length : 0})
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="medium">
                                            Create poll
                                        </Button>
                                        {/* <= move this button to poll dialog component */}
                                    </Grid>
                                </Grid>
                                {polls &&
                                    polls.map((card, i) => (
                                        <PollCard key={i} card={card} />
                                    ))}
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                className={classes.fixedHeightContainer}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between">
                                    <Grid item>
                                        <Typography
                                            display="inline"
                                            variant="h6"
                                            component="h2"
                                            className={classes.title}>
                                            Friend lists
                                        </Typography>
                                        <Typography
                                            display="inline"
                                            variant="subtitle1"
                                            component="h3">
                                            ({lists ? lists.length : 0})
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <AddFriendList
                                            users={users}
                                            addNewList={this.addNewList}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={4}>
                                    {lists &&
                                        lists.map((card, i) => (
                                            <ListCard key={i} card={card} />
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(Profile);
