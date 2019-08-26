import React, { Component } from "react";
import axios from 'axios';
import { 
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Typography,
    Container
} from '@material-ui/core';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            error: ''
        };
    }

    componentDidMount() {
        // if user is registered, redirect to profile page
    }


    onChange = e => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.id]: e.target.value });
    }


    onSubmit = e => {
        e.preventDefault();

        const { password } = this.state;
    
        // validate input fields
        if (password.length < 6) {
            this.setState({ error: 'Password should be 6 characters long' })
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


    registerUser = (userData) => {
        axios
            .post('/register', userData)
            .then(response => {
                // redirect user to profile page
            })
            .catch(err => console.log)
    }


    render() {
        return (
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Container component="main" maxWidth="xs">
                        <div>
                            <Typography component="h1" variant="h5" gutterBottom>
                                Create an account
                            </Typography>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            name="name"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Your Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password2"
                                            label="Confirm password"
                                            type="password2"
                                            id="password2"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    required
                                                    name="userAgreement"
                                                    value="userAgreementStatus"
                                                    color="primary"
                                                />
                                            }
                                            label="By signing up I agree to terms and conditions"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    onSubmit={this.onSubmit}
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Create
                                </Button>
                            </form>
                        </div>
                    </Container>

                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
            </Grid>
        );
    }
}

export default Register;