// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import { UserPanel } from "../components/UserPanel";
import AddFriendList from "../components/AddFriendList";
import AddPollDialog from "../components/AddPollDialog";
import { Slider } from "../components/Slider";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false,
            editProfileDialogIsOpen: false,
            listMove: 0,
            moveListBy: 0,
            pollMove: 0,
            movePollBy: 0
        };
    }

    componentDidMount() {
        // for a user with no friends, show suggestion to add friends:
        if (this.props.user._id && this.props.user.friends.length === 0) {
            const message = "Hi there! How about adding some friends?";
            this.props.toggleSnackbar({ action: "open", message });
        }
    }

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
        const {
            classes,
            user,
            toggleSnackbar,
            snackbarIsOpen,
            updateVotes
        } = this.props;

        const { lists, polls } = user;
        const {
            pollDialogIsOpen,
            listMove,
            moveListBy,
            pollMove,
            movePollBy
        } = this.state;

        return (
            <div className={classes.root}>
                <UserPanel
                    {...this.props}
                    togglePollDialog={this.togglePollDialog}
                    toggleEditProfileDialog={this.toggleEditProfileDialog}
                />

                <main className={classes.main}>
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
                                            toggleSnackbar={toggleSnackbar}
                                            snackbarIsOpen={snackbarIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Slider
                                    target="poll"
                                    move={pollMove}
                                    showPrevious={this.showPreviousSlide}
                                    showNext={this.showNextSlide}
                                    array={polls}
                                    moveBy={movePollBy}
                                    lists={lists}
                                    updateVotes={updateVotes}
                                />
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
                                            user={user}
                                            addNewList={this.props.addNewList}
                                            toggleSnackbar={toggleSnackbar}
                                            snackbarIsOpen={snackbarIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Slider
                                    target="list"
                                    move={listMove}
                                    showPrevious={this.showPreviousSlide}
                                    showNext={this.showNextSlide}
                                    array={lists}
                                    moveBy={moveListBy}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(Profile);
