import React, { Component } from "react";
import axios from "axios";

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

    componentDidMount() {
        // if user is logged in, redirect to profile page
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
            .post("/login", userData)
            .then(response => {
                // receive and decode token to get user data
                // redirect user to profile page
            })
            .catch(err => console.log);
    };

    render() {
        const { email, password, errors } = this.state;
        const isNotValid = password.length < 6;

        return (
            <Grid container>
                <Grid item xs={12} md={6} className="full-height relative">
                    <Container maxWidth="xs" className="centered">
                        <div>
                            <Typography
                                component="h1"
                                variant="h5"
                                className="with-mb">
                                Log In
                            </Typography>
                            <form noValidate onSubmit={this.onSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
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
                                            {errors.email && !email ? errors.email : ''}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={errors.password && isNotValid}
                                            onChange={this.onChange}
                                            variant="outlined"
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <FormHelperText error id="password">
                                            {errors.password && isNotValid ? errors.password : ''}
                                        </FormHelperText>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            className="with-mb">
                                            <Link href="#" color="textPrimary">
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
                <Grid item xs={12} md={6} className="with-background"></Grid>
            </Grid>
        );
    }
}

export default Login;
