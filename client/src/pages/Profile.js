// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
import axios from "axios";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import sortBy from "../utils/sortBy";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import AddFriendList from "../components/AddFriendList";
import AddPollDialog from "../components/AddPollDialog";
import PollCard from "../components/PollCard";
import ListCard from "../components/ListCard";
import {
    CssBaseline,
    Typography,
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
            pollDialogIsOpen: false,
            users: [],
            listMove: 0,
            moveListBy: 0,
            pollMove: 0,
            movePollBy: 0
        };
    }

    componentDidMount() {
        // for a profile page of a friend, get id from url:
        const { id } = this.props.user || this.props.location.state.user;

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
        this.setState({ polls: [newPoll.data, ...this.state.polls] });
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
                pollMove: this.state.pollMove + 1,
                movePollBy: this.state.movePollBy + 100
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
                pollMove: this.state.pollMove - 1,
                movePollBy: this.state.movePollBy - 100
            });
        }
    };

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const { classes } = this.props;
        const { _id } = this.props.user || this.props.location.state.user;
        const {
            user,
            users,
            polls,
            lists,
            drawerIsOpen,
            pollDialogIsOpen,
            listMove,
            moveListBy,
            pollMove,
            movePollBy
        } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppNavbar
                    user={user}
                    open={drawerIsOpen}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                />
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
                                        <AddPollDialog
                                            userId={_id}
                                            lists={lists}
                                            addNewPoll={this.addNewPoll}
                                            togglePollDialog={
                                                this.togglePollDialog
                                            }
                                            pollDialogIsOpen={pollDialogIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={4}
                                    className={classes.slider}>
                                    {polls &&
                                        sortBy(polls, true).map((poll, i) => (
                                            <PollCard
                                                key={i}
                                                poll={poll}
                                                movePollBy={movePollBy}
                                                user={user}
                                                users={users}
                                                lists={lists}
                                            />
                                        ))}
                                    <Grid
                                        container
                                        justify="space-between"
                                        className={classes.sliderControls}
                                        style={
                                            polls.length > 3
                                                ? { visibility: "visible" }
                                                : { visibility: "hidden" }
                                        }>
                                        <IconButton
                                            onClick={() =>
                                                this.showPreviousSlide("poll")
                                            }
                                            className="prev"
                                            disabled={pollMove === 0}>
                                            <Icon>arrow_back_ios</Icon>
                                        </IconButton>
                                        <IconButton
                                            className="next"
                                            disabled={
                                                pollMove === polls.length - 1
                                            }
                                            onClick={() =>
                                                this.showNextSlide("poll")
                                            }>
                                            <Icon>arrow_forward_ios</Icon>
                                        </IconButton>
                                    </Grid>
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
                                            userId={_id}
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
                                        sortBy(lists, true).map((list, i) => (
                                            <ListCard
                                                key={i}
                                                list={list}
                                                moveListBy={moveListBy}
                                            />
                                        ))}
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
                                            disabled={listMove === 0}>
                                            <Icon>arrow_back_ios</Icon>
                                        </IconButton>
                                        <IconButton
                                            className="next"
                                            disabled={
                                                listMove === lists.length - 1
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
