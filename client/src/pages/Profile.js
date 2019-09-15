// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
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
            drawerIsOpen: true,
            pollDialogIsOpen: false,
            listMove: 0,
            moveListBy: 0,
            pollMove: 0,
            movePollBy: 0
        };
    }

    componentDidMount() {
        console.log("Profile did mount!");
        console.log("this props in Profile: ", this.props);

        // load users for the friends drawer
        // if profile page was loaded first (user was logged in previously)
        if (!this.props.users.length) {
            this.props.loadUsers();
        }
    }

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
        console.log("this.props in render Profile: ", this.props);

        const { classes, user, users } = this.props;
        const { lists, polls } = this.props.user;
        const {
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
                                            userId={user._id}
                                            lists={lists}
                                            addNewPoll={this.props.addNewPoll}
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
                                            userId={user._id}
                                            users={users}
                                            addNewList={this.props.addNewList}
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
