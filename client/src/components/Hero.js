import React from "react";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

export const Hero = ({ hero }) => {
    return (
        <Hidden smDown>
            <Grid item xs={12} md={6} className={hero}></Grid>
        </Hidden>
    );
};
