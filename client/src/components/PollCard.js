import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
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
        // color: "rgba(255, 255, 255, 0.54)"
    }
}));

function PoolCard(props) {
    const classes = useStyles();
    const pool = {
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
        <Grid item key={pool.id} xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title={
                        <Typography component="h3" className={classes.title}>
                            {pool.title}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2">
                            {pool.options[0].votes +
                                pool.options[1].votes +
                                " answers"}
                        </Typography>
                    }
                />
                <CardContent>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key={1}>
                            <img src={pool.options[0].url} alt="First option" />
                            <GridListTileBar
                                className={classes.bar}
                                actionIcon={
                                    <IconButton
                                        size="small"
                                        aria-label=""
                                        className={classes.icon}>
                                        <Icon>favorite</Icon>
                                        {pool.options[0].votes}
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                        <GridListTile key={2}>
                            <img
                                src={pool.options[1].url}
                                alt="Second option"
                            />
                            <GridListTileBar
                                className={classes.bar}
                                actionIcon={
                                    <IconButton
                                        size="small"
                                        aria-label=""
                                        className={classes.icon}>
                                        <Icon>favorite</Icon>
                                        {pool.options[1].votes}
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    </GridList>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PoolCard;
