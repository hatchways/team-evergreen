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

const useStyles = makeStyles(profileStyles);

function FriendsPollCard(props) {
    const classes = useStyles();
    const [hasVoted, setHasVoted] = React.useState(false);
    const { poll } = props;

    const registerVote = option => {
        const dataToSend = {
            pollId: poll._id,
            userId: props.userId,
            option
        };
        props.registerVote(dataToSend);
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
                            {poll.votes[0] + poll.votes[1] || 0} answers
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
                                {poll.votes[0] || 0}
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
                                {poll.votes[1] || 0}
                            </Typography>
                        </div>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default FriendsPollCard;
