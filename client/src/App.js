import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
    loadUserData,
    logOut,
    loadUsers,
    addNewList,
    addNewPoll,
    registerVote,
    getFriendsPolls
} from "./actions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PollPage from "./pages/PollPage";
import FriendsPolls from "./pages/FriendsPolls";

import "./App.css";

// declare what pieces of state we want to have access to:
const mapStateToProps = state => {
    return {
        user: state.userReducer,
        users: state.usersReducer.users,
        friendsPolls: state.pollsReducer.friendsPolls
    };
};

// declare which action creators you need to be able to dispatch:
const mapDispatchToProps = dispatch => {
    return {
        loadUserData: data => dispatch(loadUserData(data)),
        loadUsers: id => dispatch(loadUsers(id)),
        addNewList: data => dispatch(addNewList(data)),
        addNewPoll: data => dispatch(addNewPoll(data)),
        registerVote: data => dispatch(registerVote(data)),
        getFriendsPolls: data => dispatch(getFriendsPolls(data)),
        logOut: () => dispatch(logOut())
    };
};

class App extends Component {
    componentDidMount() {
        // Check for token to keep user logged in:
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;
            setAuthToken(token);

            // Decode token and get user info
            const decoded = jwt_decode(token);

            // Set user:
            this.props.loadUserData(decoded.id);

            // fetch all users. Pass current user id to exclude
            // him/her from the list of all users:
            this.props.loadUsers(decoded.id);

            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds

            if (decoded.exp < currentTime) {
                this.logOut();
            }
        }
    }

    logOut = () => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");

        // Remove auth header for future requests
        setAuthToken(false);

        // Reset the state
        this.props.logOut();
    };

    render() {
        const isAuthenticated = localStorage.jwtToken;

        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props =>
                                isAuthenticated ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Signup
                                        {...props}
                                        loadUser={this.props.loadUserData}
                                        loadUsers={this.props.loadUsers}
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/signup"
                            render={props =>
                                isAuthenticated ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Signup
                                        {...props}
                                        loadUser={this.props.loadUserData}
                                        loadUsers={this.props.loadUsers}
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/login"
                            render={props =>
                                isAuthenticated ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Login
                                        {...props}
                                        loadUser={this.props.loadUserData}
                                        loadUsers={this.props.loadUsers}
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/profile"
                            render={props =>
                                isAuthenticated ? (
                                    <Profile
                                        {...props}
                                        user={this.props.user}
                                        users={this.props.users}
                                        loadUsers={this.props.loadUsers}
                                        addNewList={this.props.addNewList}
                                        addNewPoll={this.props.addNewPoll}
                                        logOut={this.logOut}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/poll/:id"
                            render={props =>
                                isAuthenticated ? (
                                    <PollPage
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        logOut={this.logOut}
                                        addNewPoll={this.props.addNewPoll}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/user/:id"
                            render={props =>
                                isAuthenticated ? (
                                    <Profile
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        loadUsers={this.props.loadUsers}
                                        logOut={this.logOut}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/friends-polls"
                            render={props =>
                                isAuthenticated ? (
                                    <FriendsPolls
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        addNewPoll={this.props.addNewPoll}
                                        friendsPolls={this.props.friendsPolls}
                                        getFriendsPolls={
                                            this.props.getFriendsPolls
                                        }
                                        registerVote={this.props.registerVote}
                                        logOut={this.logOut}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

// use connect to connect React to Redux:
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
