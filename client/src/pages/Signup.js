import React, { Component } from "react";
import axios from "axios";

import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Typography,
    Container,
    FormHelperText
} from "@material-ui/core";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            userAgreement: false,
            errors: {}
        };
    }

    componentDidMount() {
        // if user is registered, redirect to profile page
        console.log('props: ', this.props)
    }

    onChange = e => {
        if (e.target.name === "userAgreement") {
            this.setState({ userAgreement: e.target.checked });
        } else {
            this.setState({ [e.target.id]: e.target.value });
        }
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password, password2, userAgreement } = this.state;

        if (!name.length) {
            this.setState({ errors: { name: "Name is required" } });
        } else if (!email.length) {
            this.setState({ errors: { email: "Email is required" } });
        } else if (password.length < 6) {
            this.setState({
                errors: {
                    password: "Password should be at least 6 characters long"
                }
            });
        } else if (!password2.length) {
            this.setState({
                errors: { password2: "Comfirmation password is required" }
            });
        } else if (password !== password2) {
            this.setState({ errors: { password2: "Password does not match" } });
        } else if (!userAgreement) {
            this.setState({
                errors: {
                    userAgreement: "Please agree with terms and conditions"
                }
            });
        } else {
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2
            };
            this.registerUser(newUser);
        }
    };

    registerUser = userData => {
        axios
            .post("/signup", userData)
            .then(response => {
                // redirect user to profile page
            })
            .catch(err => console.log);
    };

    render() {
        const { errors } = this.state;

        return (
            <Grid container>
                <Grid item xs={12} md={6} className="full-height relative">
                    <Container maxWidth="xs" className="centered">
                        <div>
                            <Typography
                                component="h1"
                                variant="h5"
                                gutterBottom
                                className="with-mb">
                                Create an account
                            </Typography>
                            <form noValidate onSubmit={this.onSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                            id="name"
                                            label="Your Name"
                                            autoComplete="true"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <FormHelperText error id="name">
                                            {errors.name}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
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
                                            {errors.email}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
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
                                            {errors.password}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            fullWidth
                                            name="password2"
                                            label="Confirm password"
                                            type="password"
                                            id="password2"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <FormHelperText error id="password2">
                                            {errors.password2}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={this.onChange}
                                                    id="userAgreement"
                                                    name="userAgreement"
                                                    checked={
                                                        this.state.userAgreement
                                                    }
                                                    color="secondary"
                                                />
                                            }
                                            label="By signing up I agree to terms and conditions"
                                        />
                                        <FormHelperText
                                            error
                                            id="userAgreement">
                                            {errors.userAgreement}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                                <Button
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Create
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

export default Signup;
