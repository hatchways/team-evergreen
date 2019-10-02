import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Grid,
    GridList,
    GridListTile,
    Icon,
    Link,
    IconButton
} from "@material-ui/core";
import { socket } from "../components/UserPanel";

class PollCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: []
        };
    }

    updateVotes = votes => {
        this.setState({ votes }, () =>
            console.log("Votes were changed in state: ", this.state)
        );
    };

    fetchUpdatedVotes = () => {
        const { _id } = this.props.poll;
        console.log("Fetching updated votes...");

        socket.emit("initial_votes", _id);
    };

    componentDidMount() {
        const { _id } = this.props.poll;

        console.log("This is poll #", _id);

        // Fire the initial_votes event to get initial votes count to initialize the state:
        socket.emit("initial_votes", _id);

        // When votes count is received for this poll, update state:
        socket.on("update_votes", data => {
            if (data.pollId === _id) this.updateVotes(data.result);
        });

        // If vote count was changed at back-end for this poll, fetch it:
        socket.on("votes_changed", data => {
            if (data.pollId === _id) this.fetchUpdatedVotes();
        });
    }

    // Remove the listeners before unmounting in order to avoid addition of multiple listeners:
    componentWillUnmount() {
        console.log("poll card is unmounting!");
        socket.off("update_votes");
        socket.off("votes_changed");
    }

    render() {
        const { classes, poll, lists } = this.props;
        const { votes } = this.state;
        const votesCount = votes[0] + votes[1];

        return (
            <Grid
                item
                key={poll._id}
                xs={12}
                md={6}
                lg={4}
                style={{ transform: `translateX(-${this.props.movePollBy}%)` }}>
                <Card className={classes.card}>
                    <Link
                        underline="none"
                        component={RouterLink}
                        to={{
                            pathname: `/poll/${poll._id}`,
                            state: {
                                lists: lists,
                                poll: poll
                            }
                        }}>
                        <CardHeader
                            className={classes.pollCardHeader}
                            title={
                                <Typography
                                    component="h3"
                                    className={classes.pollTitle}>
                                    {poll.title}
                                </Typography>
                            }
                            subheader={
                                <Typography variant="body2">
                                    {votesCount || 0}{" "}
                                    {votesCount === 1 ? "answer" : "answers"}
                                </Typography>
                            }
                        />
                        <CardContent className={classes.cardContent}>
                            <GridList
                                cellHeight={180}
                                className={classes.gridList}>
                                <GridListTile key={1}>
                                    <img
                                        src={poll.options[0]}
                                        alt="First option"
                                    />
                                </GridListTile>
                                <GridListTile key={2}>
                                    <img
                                        src={poll.options[1]}
                                        alt="Second option"
                                    />
                                </GridListTile>
                            </GridList>

                            <CardActions className={classes.votesContainer}>
                                <div className={classes.votes}>
                                    <IconButton
                                        disabled={true}
                                        className={classes.icon}
                                        aria-label="Votes for first image"
                                        component="span">
                                        <Icon>favorite</Icon>
                                    </IconButton>
                                    <Typography variant="body1">
                                        {votes[0] || 0}
                                    </Typography>
                                </div>
                                <div className={classes.votes}>
                                    <IconButton
                                        disabled={true}
                                        className={classes.icon}
                                        aria-label="Votes for second image"
                                        component="span">
                                        <Icon>favorite</Icon>
                                    </IconButton>
                                    <Typography variant="body1">
                                        {votes[1] || 0}
                                    </Typography>
                                </div>
                            </CardActions>
                        </CardContent>
                    </Link>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(profileStyles)(PollCard);
