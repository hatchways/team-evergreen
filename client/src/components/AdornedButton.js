//AdornedButton.js

import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root: {
        marginLeft: 5
    }
};

const SpinnerAdornment = withStyles(styles)(props => (
    <CircularProgress className={props.classes.spinner} size={20} />
));

const AdornedButton = props => {
    const { children, loading, ...rest } = props;
    return (
        <Button {...rest}>
            {children}
            {loading && <SpinnerAdornment {...rest} />}
        </Button>
    );
};
