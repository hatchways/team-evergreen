import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import { friendsPageStyles } from "../styles/friendsPageStyles";

import AddPollDialog from "../components/AddPollDialog";
import UserPanel from "../components/UserPanel";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Paper
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <Box p={3}>{children}</Box>
        </Paper>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false,
            value: 0
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    render() {
        const { classes, user, users } = this.props;
        const { lists } = this.props.user;
        const { pollDialogIsOpen, value } = this.state;
        return (
            <div className={classes.root}>
                <UserPanel
                    user={user}
                    users={users}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                    addNewPoll={this.props.addNewPoll}
                />

                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            <Grid
                                container
                                item
                                xs={12}
                                justify="center"
                                className={classes.friendsContainer}>
                                <Grid item xs={12} container justify="center">
                                    <Grid item>
                                        <Typography
                                            display="inline"
                                            variant="h6"
                                            component="h2"
                                            className={classes.title}>
                                            Friends
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <AddPollDialog
                                            userId={user._id}
                                            lists={lists}
                                            addNewPoll={this.props.addNewPoll}
                                            pollDialogIsOpen={pollDialogIsOpen}
                                            hideButton={true}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={10}
                                    container
                                    justify="center"
                                    spacing={4}
                                    className={classes.tabsContainer}>
                                    <Tabs
                                        variant="fullWidth"
                                        value={value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        className={classes.tabs}>
                                        <Tab
                                            label="Item One"
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            label="Item Two"
                                            {...a11yProps(1)}
                                        />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                        Item One
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        Item Two
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(theme => ({
    ...profileStyles(theme),
    ...friendsPageStyles(theme)
}))(Friends);
