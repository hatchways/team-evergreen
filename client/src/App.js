import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            user: {
                id: "",
                name: ""
            }
        };
    }

    componentDidMount() {
        // Check for token to keep user logged in:
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;
            setAuthToken(token);

            // Decode token and get user info
            const decoded = jwt_decode(token);

            // Set user and isAuthenticated
            this.loadUser(decoded);

            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds

            if (decoded.exp < currentTime) {
                this.logOut();
            }
        }
    }

    loadUser = data => {
        this.setState({
            isAuthenticated: true,
            user: {
                id: data.id,
                name: data.name
            }
        });
    };

    logOut = () => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");

        // Remove auth header for future requests
        setAuthToken(false);

        // Reset the state
        this.setState({
            isAuthenticated: false,
            user: {
                id: "",
                name: ""
            }
        });

        // Redirect to login
        window.location.href = "./login";
    };

    render() {
        const { isAuthenticated, user } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Route
                        exact
                        path="/"
                        render={props =>
                            isAuthenticated ? (
                                <Redirect to="/profile" />
                            ) : (
                                <Signup {...props} loadUser={this.loadUser} />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        render={props =>
                            isAuthenticated ? (
                                <Redirect to="/profile" />
                            ) : (
                                <Signup {...props} loadUser={this.loadUser} />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        render={props =>
                            isAuthenticated ? (
                                <Redirect to="/profile" />
                            ) : (
                                <Login {...props} loadUser={this.loadUser} />
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        render={props =>
                            isAuthenticated ? (
                                <Profile
                                    {...props}
                                    user={user}
                                    logOut={this.logOut}
                                />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }
                    />
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
