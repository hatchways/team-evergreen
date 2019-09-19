import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
    Link,
    IconButton
} from "@material-ui/core";

const useStyles = makeStyles(profileStyles);

function PollCard(props) {
    const classes = useStyles();
    const { poll } = props;
    const votesCount = poll.votes[0] + poll.votes[1];

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
                            lists: props.lists,
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
                                    {poll.votes[0] || 0}
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
                                    {poll.votes[1] || 0}
                                </Typography>
                            </div>
                        </CardActions>
                    </CardContent>
                </Link>
            </Card>
        </Grid>
    );
}

export default PollCard;
