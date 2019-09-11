// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
import axios from "axios";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import FriendsDrawer from "../components/FriendsDrawer";
import AddFriendList from "../components/AddFriendList";
import PollCard from "../components/PollCard";
import ListCard from "../components/ListCard";
import {
    CssBaseline,
    Typography,
    Button,
    Container,
    Grid,
    IconButton,
    Icon
} from "@material-ui/core";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            lists: [],
            polls: [],
            drawerIsOpen: true,
            users: [],
            listMove: -1,
            moveListBy: 0,
            pollMove: -1,
            movePollBy: 0
        };
    }

    componentDidMount() {
        const { id } = this.props.user;

        // fetch user data from database:
        axios
            .get(`api/users/user/${id}`)
            .then(response => {
                this.setState(
                    {
                        user: response.data,
                        lists: response.data.lists,
                        polls: response.data.polls
                    },
                    () => console.log(this.state)
                );
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
        // show friends' names and avatars for the newly created list:
        newList.friends.forEach((id, i, array) => {
            const user = this.state.users.find(user => user._id === id);

            array[i] = {
                _id: id,
                name: user.name,
                avatar: user.avatar
            };
        });
        this.setState({ lists: [newList, ...this.state.lists] });
    };

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    };

    showNextSlide = target => {
        if (target === "list") {
            this.setState({
                listMove: this.state.listMove + 1,
                moveListBy: this.state.moveListBy + 100
            });
        } else {
            this.setState({
                pollMove: this.state.listMove + 1,
                movePollBy: this.state.moveListBy + 100
            });
        }
    };

    showPreviousSlide = target => {
        if (target === "list") {
            this.setState({
                listMove: this.state.listMove - 1,
                moveListBy: this.state.moveListBy - 100
            });
        } else {
            this.setState({
                pollMove: this.state.listMove - 1,
                movePollBy: this.state.moveListBy - 100
            });
        }
    };

    sortBy = (array, sortAsc) => {
        return array.sort((a, b) => {
            if (sortAsc === false) {
                return a.createdAt > b.createdAt
                    ? 1
                    : a.createdAt === b.createdAt
                    ? 0
                    : -1;
            } else {
                return a.createdAt < b.createdAt
                    ? 1
                    : a.createdAt === b.createdAt
                    ? 0
                    : -1;
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { id } = this.props.user;
        const {
            users,
            polls,
            lists,
            drawerIsOpen,
            listMove,
            moveListBy
        } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
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
                                <Grid container item spacing={4}>
                                    {polls &&
                                        polls.map((poll, i) => (
                                            <PollCard key={i} poll={poll} />
                                        ))}
                                </Grid>
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
                                            userId={id}
                                            users={users}
                                            addNewList={this.addNewList}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={4}
                                    className={classes.slider}>
                                    {lists &&
                                        this.sortBy(lists, true).map(
                                            (list, i) => (
                                                <ListCard
                                                    key={i}
                                                    list={list}
                                                    moveListBy={moveListBy}
                                                    listMove={listMove}
                                                />
                                            )
                                        )}
                                    <Grid
                                        container
                                        justify="space-between"
                                        className={classes.sliderControls}
                                        style={
                                            lists.length > 3
                                                ? { visibility: "visible" }
                                                : { visibility: "hidden" }
                                        }>
                                        <IconButton
                                            onClick={() =>
                                                this.showPreviousSlide("list")
                                            }
                                            className="prev"
                                            disabled={listMove === -1}>
                                            <Icon>arrow_back_ios</Icon>
                                        </IconButton>
                                        <IconButton
                                            className="next"
                                            disabled={
                                                listMove === lists.length - 2
                                            }
                                            onClick={() =>
                                                this.showNextSlide("list")
                                            }>
                                            <Icon>arrow_forward_ios</Icon>
                                        </IconButton>
                                    </Grid>
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
