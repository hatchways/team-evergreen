import React, { Component } from "react";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import sortBy from "../utils/sortBy";
import FriendsPollCard from "../components/FriendsPollCard";
import UserPanel from "../components/UserPanel";
import AddPollDialog from "../components/AddPollDialog";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
        const { pollDialogIsOpen } = this.state;
        const friendsPolls = [
            {
                _id: "5d7e7a4b2c55c706fbed8ac1",
                options: [
                    "https://evegreen.s3.us-west-1.amazonaws.com/9dcd48c7-4884-4a67-877d-ee778aebb376",
                    "https://evegreen.s3.us-west-1.amazonaws.com/04292b5e-ca2b-4c17-842d-ae58d25ccc32"
                ],
                votes: [],
                title: "lfhsd",
                userId: "5d7da350c440f87937ef7174",
                sendToList: "5d7deb294313b8033fa98b85",
                createdAt: "2019-09-15T17:52:11.363+00:00"
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
                                            lists={this.props.user.lists}
                                            addNewPoll={this.props.addNewPoll}
                                            togglePollDialog={
                                                this.togglePollDialog
                                            }
                                            pollDialogIsOpen={pollDialogIsOpen}
                                            isFriendsPolls={true}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={4}>
                                    {friendsPolls &&
                                        sortBy(friendsPolls, true).map(
                                            (poll, i) => (
                                                <FriendsPollCard
                                                    key={i}
                                                    poll={poll}
                                                    userId={user._id}
                                                    registerVote={
                                                        this.props.registerVote
                                                    }
                                                />
                                            )
                                        )}
                                </Grid>
                                <Grid item spacing={4} xs={12}>
                                    <Button
                                        style={{
                                            margin: "32px auto",
                                            display:
                                                friendsPolls.length > 9
                                                    ? "block"
                                                    : "none"
                                        }}
                                        variant="contained"
                                        color="primary"
                                        size="medium">
                                        Load more
                                    </Button>
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
