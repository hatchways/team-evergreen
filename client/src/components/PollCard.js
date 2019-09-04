import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    Typography,
    IconButton,
    Grid,
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
        textAlign: "center",
        fontSize: "1.25rem"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardActions: {
        justifyContent: "center"
    }
}));

function PollCard(props) {
    const classes = useStyles();
    const poll = {
        id: 1,
        title: "Which do you like best?",
        options: [
            {
                url1: "https://source.unsplash.com/random",
                votes: 12
            },
            {
                url2: "https://source.unsplash.com/random",
                votes: 2
            }
        ]
    };

    return (
        <Grid item key={poll.id} xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title={<Typography variant="h6">{poll.title}</Typography>}
                    subheader={
                        poll.options[0].votes +
                        poll.options[1].votes +
                        " answers"
                    }
                />
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                />
                <CardActions className={classes.cardActions}>
                    <IconButton size="small">
                        <Icon>favorite</Icon>
                        {poll.options[0].votes}
                    </IconButton>
                    <IconButton size="small">
                        <Icon>favorite</Icon>
                        {poll.options[1].votes}
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default PollCard;
