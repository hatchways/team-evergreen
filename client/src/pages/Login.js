import React, { Component } from "react";
import axios from "axios";
import AuthNavbar from "../components/AuthNavbar";
import { withStyles } from "@material-ui/styles";
import { authStyles } from "../styles/authStyles";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import {
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    FormHelperText,
    Link
} from "@material-ui/core";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        if (!email.length) {
            this.setState({ errors: { email: "Email is required" } });
        } else if (password.length < 6) {
            this.setState({
                errors: {
                    password: "Password should be at least 6 characters long"
                }
            });
        } else {
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            this.loginUser(user);
        }
    };

    loginUser = userData => {
        axios
            .post("/api/users/login", userData)
            .then(response => {
                const { token } = response.data;
                // save token to localStorage
                localStorage.setItem("jwtToken", token);

                // Set token to Auth header
                setAuthToken(token);

                // Decode token to get user data
                const decoded = jwt_decode(token);

                // Load current user
                this.props.loadUser(decoded);

                // redirect user to profile page:
                this.props.history.push("/profile");
            })
            .catch(err => {
                console.log(err);
                this.setState({ errors: err.response.data });
            });
    };

    render() {
        const { classes } = this.props;
        const { email, password, errors } = this.state;
        const isNotValid = password.length < 6;

        return (
            <>
                <AuthNavbar target="signup" />
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Container maxWidth="xs" className={classes.container}>
                            <div>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    className={classes.heading}>
                                    Log In
                                </Typography>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={classes.uppercase}
                                                error={errors.email && !email}
                                                onChange={this.onChange}
                                                variant="outlined"
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="true"
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                            <FormHelperText error id="email">
                                                {errors.email && !email
                                                    ? errors.email
                                                    : ""}
                                            </FormHelperText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={classes.uppercase}
                                                error={
                                                    errors.password &&
                                                    isNotValid
                                                }
                                                onChange={this.onChange}
                                                variant="outlined"
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="true"
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                            <FormHelperText error id="password">
                                                {errors.password && isNotValid
                                                    ? errors.password
                                                    : ""}
                                            </FormHelperText>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.link}>
                                            <Typography variant="body2">
                                                <Link
                                                    href="#"
                                                    color="textPrimary">
                                                    Forgot password?
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary">
                                        Login
                                    </Button>
                                </form>
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.hero}></Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(authStyles)(Login);