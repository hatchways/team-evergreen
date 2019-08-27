import React, { Component } from "react";
import axios from 'axios';
import '../App.css';

import { 
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    FormHelperText
} from '@material-ui/core';


class Login extends Component {
    constructor() {
        super();
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
    }


    onSubmit = e => {
        e.preventDefault();
        
        const { email, password } = this.state;

        if (!email.length) {
            this.setState({ errors: { email: 'Email is required' }});
        }

        else if (password.length < 6) {
            this.setState({ errors: { password: 'Password should be at least 6 characters long' }});
        }

        else {
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            this.loginUser(user); 
        }
    };


    loginUser = (userData) => {
        axios
            .post('/login', userData)
            .then(response => {
                // receive and decode token to get user data
                // redirect user to profile page
            })
            .catch(err => console.log)
    }


    render() {
        const { errors } = this.state;

        return (
            <Grid container>
                <Grid item xs={12} md={6} className="full-height relative">
                    <Container maxWidth="xs" className="centered">
                        <div>
                            <Typography component="h1" variant="h5" gutterBottom>
                                Log In
                            </Typography>
                            <form noValidate onSubmit={this.onSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                        />
                                        <FormHelperText error id="email">{errors.email}</FormHelperText>
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
                                        />
                                        <FormHelperText error id="password">{errors.password}</FormHelperText>
                                    </Grid>
                                   
                                    <Grid item xs={12}>
                                        <Typography variant="body2" gutterBottom>Forgot Password?</Typography>
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