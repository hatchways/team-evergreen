import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(profileStyles);

export const PollsFilter = ({
    polls,
    completedPolls,
    filterPolls,
    handleChange
}) => {
    const classes = useStyles();

    return (
        <FormControl>
            <Select value={filterPolls} onChange={handleChange}>
                <MenuItem value="all">
                    <Typography
                        display="inline"
                        variant="h6"
                        component="h2"
                        className={classes.title}>
                        All polls
                    </Typography>
                    <Typography
                        display="inline"
                        variant="subtitle1"
                        component="span"
                        className={classes.subtitle}>
                        ({polls ? polls.length : 0})
                    </Typography>
                </MenuItem>
                <MenuItem value="completed">
                    <Typography
                        display="inline"
                        variant="h6"
                        component="h2"
                        className={classes.title}>
                        Completed
                    </Typography>
                    <Typography
                        display="inline"
                        variant="subtitle1"
                        component="span"
                        className={classes.subtitle}>
                        ({completedPolls ? completedPolls.length : 0})
                    </Typography>
                </MenuItem>
            </Select>
        </FormControl>
    );
};
