import React from "react";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import { CssBaseline } from "@material-ui/core";
import socketIOClient from "socket.io-client";

const socket = socketIOClient();

function UserPanel(props) {
    const [drawerIsOpen, setDrawerIsOpen] = React.useState(true);
    const [mobileDrawerIsOpen, setMobileDrawerIsOpen] = React.useState(false);
    const { user, users } = props;
    //  Create a Socket client and export it to be used across other components:

    const toggleDrawer = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };

    const toggleMobileDrawer = () => {
        setMobileDrawerIsOpen(!mobileDrawerIsOpen);
    };

    return (
        <>
            <CssBaseline />
            <AppNavbar
                user={user}
                drawerIsOpen={drawerIsOpen}
                logOut={props.logOut}
                togglePollDialog={props.togglePollDialog}
                toggleDrawer={toggleDrawer}
                toggleMobileDrawer={toggleMobileDrawer}
            />
            <FriendsDrawer
                user={user}
                users={users}
                drawerIsOpen={drawerIsOpen}
                mobileDrawerIsOpen={mobileDrawerIsOpen}
                toggleDrawer={toggleDrawer}
                toggleMobileDrawer={toggleMobileDrawer}
            />
        </>
    );
}

export { UserPanel, socket };
