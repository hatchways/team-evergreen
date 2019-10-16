import React from "react";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import { CssBaseline } from "@material-ui/core";
import io from "socket.io-client";
let socket;
import AppSnackbar from "./AppSnackbar";

function UserPanel(props) {
    const [drawerIsOpen, setDrawerIsOpen] = React.useState(true);
    const [mobileDrawerIsOpen, setMobileDrawerIsOpen] = React.useState(false);
    socket = io("ws://localhost:3001", {
        transports: ["websocket"]
    });
    const {
        user,
        users,
        toggleSnackbar,
        snackbarIsOpen,
        snackbarMessage
    } = props;

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
                updateUserDataInState={props.updateUserDataInState}
                toggleSnackbar={toggleSnackbar}
            />
            <FriendsDrawer
                user={user}
                users={users}
                drawerIsOpen={drawerIsOpen}
                mobileDrawerIsOpen={mobileDrawerIsOpen}
                toggleDrawer={toggleDrawer}
                toggleMobileDrawer={toggleMobileDrawer}
            />
            <AppSnackbar
                snackbarMessage={snackbarMessage}
                snackbarIsOpen={snackbarIsOpen}
                toggleSnackbar={toggleSnackbar}
            />
        </>
    );
}

export { UserPanel, socket };
