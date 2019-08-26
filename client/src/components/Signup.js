import React, { Component } from "react";
import axios from 'axios';
import { 
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Typography,
    Container,
    FormHelperText
} from '@material-ui/core';

class Signup extends Component {
    constructor() {
        super();
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
    }


    onChange = e => {
        console.log('e.target.name: ', e.target.name, 'e.target.value: ', e.target.value)
        if (e.target.name === 'userAgreement') {
            this.setState({ userAgreement: !this.state.userAgreement }, console.log(this.state));
        } else {
            this.setState({ [e.target.id]: e.target.value });
        }
    }


    onSubmit = e => {
        e.preventDefault();
        
        const { name, email, password, password2 } = this.state;
    
        if (!name.length) {
            this.setState({ errors: { name: 'Name is required' }}, () => console.log(this.state));
        }

        else if (!email.length) {
            this.setState({ errors: { email: 'Email is required' }}, () => console.log(this.state));
        }

        else if (password.length < 6) {
            this.setState({ errors: { password: 'Password should be at least 6 characters long' }}, () => console.log(this.state));
        }

        else if (!password2.length) {
            this.setState({ errors: { password2: 'Comfirmation password is required' }}, () => console.log(this.state));
        }

        else if (password !== password2) {
            this.setState({ errors: { password2: 'Password does not match' }}, () => console.log(this.state));
        }

        else if (password !== password2) {
            this.setState({ errors: { password2: 'Password does not match' }}, () => console.log(this.state));
        }

        else {
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
        // axios
        //     .post('/register', userData)
        //     .then(response => {
        //         // redirect user to profile page
        //     })
        //     .catch(err => console.log)
    }


    render() {

        const { errors } = this.state;

        return (
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Container component="main" maxWidth="xs">
                        <div>
                            <Typography component="h1" variant="h5" gutterBottom>
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
                                        />
                                        <FormHelperText id="name">{errors.name}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                        />
                                        <FormHelperText id="email">{errors.email}</FormHelperText>
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
                                        <FormHelperText id="password">{errors.password}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={this.onChange}
                                            variant="outlined"
                                            fullWidth
                                            name="password2"
                                            label="Confirm password"
                                            type="password2"
                                            id="password2"
                                        />
                                        <FormHelperText id="password2">{errors.password2}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={this.onChange}
                                                    id="userAgreement"
                                                    name="userAgreement"
                                                    checked={this.state.userAgreement}
                                                    color="secondary"
                                                />
                                            }
                                            label="By signing up I agree to terms and conditions"
                                        />
                                        <FormHelperText id="userAgreement">{errors.userAgreement}</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Button
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

export default Signup;