import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    GridList,
    GridListTile,
    Icon
} from "@material-ui/core";

const useStyles = makeStyles(profileStyles);

function PollCard(props) {
    const classes = useStyles();
    const poll = {
        id: 1,
        title: "Which do you like best?",
        options: [
            {
                url: "https://source.unsplash.com/random",
                votes: 12
            },
            {
                url: "https://source.unsplash.com/random",
                votes: 2
            }
        ]
    };

    return (
        <Grid
            item
            key={poll._id}
            xs={12}
            md={6}
            lg={4}
            style={{ transform: `translateX(-${props.movePollBy}%)` }}>
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
                            {poll.options[0].votes +
                                poll.options[1].votes +
                                " answers"}
                        </Typography>
                    }
                />
                <CardContent>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key={1}>
                            <img src={poll.options[0].url} alt="First option" />
                        </GridListTile>
                        <GridListTile key={2}>
                            <img
                                src={poll.options[1].url}
                                alt="Second option"
                            />
                        </GridListTile>
                    </GridList>

                    <div className={classes.votesContainer}>
                        <div className={classes.votes}>
                            <Icon className={classes.icon}>favorite</Icon>
                            {poll.options[0].votes}
                        </div>
                        <div className={classes.votes}>
                            <Icon className={classes.icon}>favorite</Icon>
                            {poll.options[1].votes}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PollCard;
