import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import ListCard from "../components/ListCard";
import PollCard from "../components/PollCard";

const useStyles = makeStyles(profileStyles);

export const Slider = ({
    target,
    move,
    showPrevious,
    showNext,
    array,
    lists,
    moveBy,
    updateVotes
}) => {
    const classes = useStyles();

    return (
        <Grid container item spacing={4} className={classes.slider}>
            {array &&
                array.map(item =>
                    target === "list" ? (
                        <ListCard
                            key={item._id}
                            list={item}
                            moveListBy={moveBy}
                        />
                    ) : (
                        <PollCard
                            key={item._id}
                            poll={item}
                            movePollBy={moveBy}
                            lists={lists}
                            updateVotes={updateVotes}
                        />
                    )
                )}
            <Box
                key={array.length}
                display={{
                    xs: array.length > 1 ? "block" : "none",
                    md: array.length > 2 ? "block" : "none",
                    lg: array.length > 3 ? "block" : "none"
                }}>
                <IconButton
                    color="primary"
                    className={clsx(classes.prevButton, classes.sliderControl)}
                    onClick={() => showPrevious(target)}
                    disabled={move === 0}>
                    <Icon>chevron_left</Icon>
                </IconButton>
                <IconButton
                    color="primary"
                    className={clsx(classes.nextButton, classes.sliderControl)}
                    disabled={move === array.length - 1}
                    onClick={() => showNext(target)}>
                    <Icon>chevron_right</Icon>
                </IconButton>
            </Box>
        </Grid>
    );
};
