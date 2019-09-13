import React, { Component } from "react";
import axios from "axios";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import { CssBaseline, Container, Grid } from "@material-ui/core";

class PollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            lists: [],
            polls: [],
            drawerIsOpen: true,
            pollDialogIsOpen: false,
            users: []
        };
    }

    componentDidMount() {
        console.log("this.props.history in PollPage: ", this.props.history);

        const { id } = this.props.user;

        // fetch user data from database:
        axios
            .get(`api/users/user/${id}`)
            .then(response => {
                this.setState(
                    {
                        user: response.data,
                        lists: response.data.lists,
                        polls: response.data.polls
                    },
                    () => console.log(this.state)
                );
            })
            .catch(err => console.log(err));

        // get all users:
        this.fetchUsers();
    }

    fetchUsers = () => {
        // fetch all users and populate state
        axios
            .get("api/users/")
            .then(response => {
                // exclude current user from list of all users:
                const users = response.data.filter(
                    user => user._id !== this.props.user.id
                );
                this.setState({ users });
            })
            .catch(err => console.log(err));
    };

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    };

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const { classes } = this.props;
        const { user, users, drawerIsOpen } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppNavbar
                    user={user}
                    open={drawerIsOpen}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                />
                <FriendsDrawer
                    users={users}
                    open={drawerIsOpen}
                    toggleDrawer={this.toggleDrawer}
                />
                <div className={classes.appBarSpacer} />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            I am a poll page!
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(PollPage);
