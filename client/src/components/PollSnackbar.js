import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5)
    }
}));

export default function PollSnackbar(props) {
    const classes = useStyles();
    const { snackbarIsOpen, closeSnackbar } = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={snackbarIsOpen}
                autoHideDuration={5000}
                onClose={closeSnackbar}
                ContentProps={{
                    "aria-describedby": "create-poll-message"
                }}
                message={
                    <span id="create-poll-message">
                        A new poll was successfully created!
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={closeSnackbar}>
                        <Icon>close</Icon>
                    </IconButton>
                ]}
            />
        </div>
    );
}
