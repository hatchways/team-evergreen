import React from "react";
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
import { socket } from "../utils/setSocketConnection";

function PollCard(props) {
    const { classes, poll, lists } = props;
    const { votes } = props.poll;
    const votesCount = votes[0] + votes[1];

    React.useEffect(() => {
        const { _id } = props.poll;

        //  Listen to new vote registration event:
        socket.on("votes_changed", data => {
            // if vote was registred for this poll, update vote count:
            if (data.pollId === _id) {
                props.updateVotes(data.pollId, data.newCounts);
            }
        });

        return () => {
            socket.off("votes_changed");
        };
    }, [props.poll._id]); // provide poll id so only new poll is mounted when it is added to polls array

    return (
        <Grid
            item
            key={poll._id}
            xs={12}
            md={6}
            lg={4}
            style={{ transform: `translateX(-${props.movePollBy}%)` }}>
            <Card className={classes.card}>
                <Link
                    underline="none"
                    component={RouterLink}
                    to={{
                        pathname: `/poll/${poll._id}`,
                        state: {
                            lists,
                            poll
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
                        <GridList cellHeight={180} className={classes.gridList}>
                            <GridListTile key={1}>
                                <img src={poll.options[0]} alt="First option" />
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

export default withStyles(profileStyles)(PollCard);
