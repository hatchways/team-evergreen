import React, { Component } from "react";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <div>This is Login page</div>
        )
    }
}

export default Login;