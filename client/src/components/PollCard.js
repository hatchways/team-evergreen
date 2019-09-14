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
    /*const poll = {
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
    };*/
    const { poll } = props;

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
                            {"14 answers" /*TODO - Add proper counts*/}
                        </Typography>
                    }
                />
                <CardContent>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key={1}>
                            <img src={poll.options[0]} alt="First option" />
                        </GridListTile>
                        <GridListTile key={2}>
                            <img src={poll.options[1]} alt="Second option" />
                        </GridListTile>
                    </GridList>

                    <div className={classes.votesContainer}>
                        <div className={classes.votes}>
                            <Icon className={classes.icon}>favorite</Icon>
                            {12 /*TODO fix the votes*/}
                        </div>
                        <div className={classes.votes}>
                            <Icon className={classes.icon}>favorite</Icon>
                            {2 /*TODO fox the votes*/}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PollCard;
