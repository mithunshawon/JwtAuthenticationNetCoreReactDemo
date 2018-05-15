import React, { Component } from 'react';
import { TextField, Button } from 'react-md';
import axios from 'axios';


export class RegisterForm extends Component {

    constructor(props) {
        super(props);
    }

    clearInputs = () => { 
        document.getElementById('registration-form').reset();
      }

    handleSubmit = (e) => {
        let data = JSON.stringify({
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            location: this.location.value,
            password: this.password.value,
            email: this.email.value
        })

        axios.post('http://localhost:50686/api/account', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            alert(response.data);
            this.clearInputs();
        })
            .catch(error => {
                alert(error);
                this.clearInputs();
            });  
        e.preventDefault();
    }

    render() {
        return (
            <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--8 md-cell--2-offset">
                <form id="registration-form" className="md-grid" onSubmit={this.handleSubmit}>
                    <TextField
                        key={0}
                        id="floating-center-title"
                        label="First Name"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                        ref={(input) => this.firstName = input}
                    />
                    <TextField
                        id="floating-center-title-r-1"
                        label="Last Name"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                        ref={(input) => this.lastName = input}
                    />
                    <TextField
                        id="floating-center-title-r-3"
                        label="Location"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                        ref={(input) => this.location = input}
                    />
                    <TextField
                        id="floating-center-title-r-2"
                        label="Email"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                        ref={(input) => this.email = input}
                    />
                    <TextField
                        id="floating-password-r"
                        label="Enter your password"
                        type="password"
                        className="md-cell md-cell--4"
                        ref={(input) => this.password = input}
                    />

                    <Button type="submit" className="md-cell md-cell--4" style={{ marginTop: 27 }} flat primary swapTheming>Register</Button>
                </form>


            </div>
        );
    }

}