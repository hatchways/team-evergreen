import React, { Component } from "react";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import { CssBaseline } from "@material-ui/core";

class FriendsPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: true
        };
    }

    toggleDrawer = () => {
        this.setState({ drawerIsOpen: !this.state.drawerIsOpen });
    };

    render() {
        const { user, users } = this.props;
        const { drawerIsOpen } = this.state;

        return (
            <>
                <CssBaseline />
                <AppNavbar
                    user={user}
                    open={drawerIsOpen}
                    logOut={this.props.logOut}
                    togglePollDialog={this.props.togglePollDialog}
                />
                <FriendsDrawer
                    user={user}
                    users={users}
                    open={drawerIsOpen}
                    toggleDrawer={this.toggleDrawer}
                />
            </>
        );
    }
}

export default FriendsPolls;
