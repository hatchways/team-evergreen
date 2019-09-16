// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import sortBy from "../utils/sortBy";
import AddFriendList from "../components/AddFriendList";
import PollCard from "../components/PollCard";
import ListCard from "../components/ListCard";
import UserPanel from "../components/UserPanel";
import AddPollDialog from "../components/AddPollDialog";
import {
    Typography,
    Container,
    Grid,
    IconButton,
    Icon
} from "@material-ui/core";

class FriendsPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false
        };
    }

    componentDidMount() {
        // get friends polls the user can vote on:
    }

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const { classes, user, users } = this.props;
        const { lists } = this.props.user;
        const { pollDialogIsOpen } = this.state;
        const friendsPolls = [
            {
                _id: "5d77db444293c8a68abbe09d",
                options: [
                    "https://evegreen.s3.us-west-1.amazonaws.com/4ca340ab-2a6a-40f5-ae68-710f5c1c92f6",
                    "https://evegreen.s3.us-west-1.amazonaws.com/bdf758d0-ee77-45f6-8dbc-b05c31121c61"
                ],
                title: "TestPoll",
                userId: "5d76cf055f78b983c25f8137",
                sendToList: "5d7738ac949d55941f24a244",
                createdAt: "2019-09-10T17:20:04.280+00:00",
                votes: [24, 9]
            }
        ]; // temp friends data

        return (
            <div className={classes.root}>
                <UserPanel
                    user={user}
                    users={users}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                    addNewPoll={this.props.addNewPoll}
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
                                                Friends Polls
                                            </Typography>
                                            <Typography
                                                display="inline"
                                                variant="subtitle1"
                                                component="h3">
                                                (
                                                {friendsPolls
                                                    ? friendsPolls.length
                                                    : 0}
                                                )
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
                                            isFriendsPolls={true}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={4}
                                    className={classes.slider}>
                                    {friendsPolls &&
                                        sortBy(friendsPolls, true).map(
                                            (poll, i) => (
                                                <PollCard
                                                    key={i}
                                                    poll={poll}
                                                    user={user}
                                                    users={users}
                                                />
                                            )
                                        )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(FriendsPolls);
