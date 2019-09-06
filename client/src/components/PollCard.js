import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
    },
    cardHeader: {
        textAlign: "center"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardActions: {
        justifyContent: "center"
    },
    title: {
        fontWeight: "600"
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: "auto",
        height: 200
    },
    icon: {
        color: theme.palette.common.red,
        marginRight: "2px"
    },
    votes: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: theme.spacing(2)
    },
    votesContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    }
}));

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
        <Grid item key={poll.id} xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title={
                        <Typography component="h3" className={classes.title}>
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
