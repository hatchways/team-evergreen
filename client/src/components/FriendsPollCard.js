import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    IconButton
} from "@material-ui/core";
import { socket } from "./UserPanel";

const useStyles = makeStyles(profileStyles);

function FriendsPollCard(props) {
    const classes = useStyles();
    const [votes, setVotes] = React.useState([0, 0]);
    const [hasVoted, setHasVoted] = React.useState(false);
    const { poll } = props;
    const votesCount = votes[0] + votes[1];

    React.useEffect(() => {
        // Fire the initial_votes event to get initial votes count to initialize the state:
        socket.emit("initial_votes", poll._id);

        // When votes count is received, update state:
        socket.on("update_votes", data => {
            if (data.pollId === poll._id) setVotes(data.result);
        });

        // If vote count was changed at back-end, fetch it:
        socket.on("votes_changed", data => {
            if (data.pollId === poll._id) setVotes(data.newCounts);
        });

        return () => {
            socket.off("update_votes");
            socket.off("votes_changed");
        };
    });

    const registerVote = option => {
        const dataToSend = {
            pollId: poll._id,
            userId: props.userId,
            option
        };

        // Use socket for real-time updates:
        socket.emit("register_vote", dataToSend);
        setHasVoted(true);
    };

    return (
        <Grid item key={poll._id} xs={12} md={6} lg={4}>
            <Card className={classes.card}>
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
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key={1}>
                            <img src={poll.options[0]} alt="First option" />
                        </GridListTile>
                        <GridListTile key={2}>
                            <img src={poll.options[1]} alt="Second option" />
                        </GridListTile>
                    </GridList>

                    <CardActions className={classes.votesContainer}>
                        <div className={classes.votes}>
                            <IconButton
                                disabled={hasVoted}
                                onClick={() => registerVote(0)}
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
                                disabled={hasVoted}
                                onClick={() => registerVote(1)}
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
            </Card>
        </Grid>
    );
}

export default FriendsPollCard;
