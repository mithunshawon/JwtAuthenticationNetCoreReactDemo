import React, { Component } from 'react';
import { TextField, Button } from 'react-md';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        let data = JSON.stringify({
            password: this.password.value,
            userName: this.email.value
        })

        axios.post('http://localhost:50686/api/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            // console.log(response);
            localStorage.setItem('auth_token', response.data.auth_token);
            this.props.history.push('/home');
        })
            .catch(error => {
                console.log(error);
            });   
        e.preventDefault();
    }

    render() {
        return (
            <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--8 md-cell--2-offset">
                <form className="md-grid" onSubmit={this.handleSubmit}>
                    <TextField
                        id="floating-center-title-login"
                        label="Email"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                        ref={(input) => this.email = input}
                    />
                    <TextField
                        id="floating-password-login"
                        label="Enter your password"
                        type="password"
                        className="md-cell md-cell--6"
                        ref={(input) => this.password = input}
                    />
                    <Button type="submit" className="md-cell md-cell--2" style={{ marginTop: 27 }} flat primary swapTheming>Log in</Button>
                </form>

            </div>
        );
    }

}

export default withRouter(LoginForm);