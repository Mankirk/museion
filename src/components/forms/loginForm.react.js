import React, { Component } from "react";

import "./forms.scss";

class LoginForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            email: "",
            password: "",
        };

        this.handleInput = this.handleInput.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleInput( evt ) {
        const { name, value } = evt.target;
        const updatedValue = {};
        updatedValue[ name ] = value;
        this.setState( updatedValue );
    }

    handleSubmit() {
        console.log( "submitting", this.state );
    }

    render() {
        return (
            <div className="form login-form">
                <h3 className="login-header">Login</h3>
                <div className="inputs">
                    <input
                        className="input-normal"
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={ this.handleInput }
                    />
                    <input
                        className="input-normal"
                        type="text"
                        placeholder="Password"
                        name="password"
                        onChange={ this.handleInput }
                    />
                </div>
                <button className="submit" onClick={ this.handleSubmit }>
                    Submit
                </button>
            </div>
        );
    }
}

export default LoginForm;
