import React, { Component } from 'react';
import { TextField, Button } from 'react-md';

export class RegisterForm extends Component {

    constructor(props) {
        super(props);

    }

    handleSubmit = (e) => {
        alert('clicked');
        e.preventDefault();
    }

    render() {
        return (
            <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--8 md-cell--2-offset">
                <form className="md-grid" onSubmit={this.handleSubmit}>
                    <TextField
                        key={0}
                        id="floating-center-title"
                        label="First Name"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                    />
                    <TextField
                        id="floating-center-title-r-1"
                        label="Last Name"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                    />
                    <TextField
                        id="floating-center-title-r-3"
                        label="Location"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                    />
                    <TextField
                        id="floating-center-title-r-2"
                        label="Email"
                        lineDirection="center"
                        className="md-cell md-cell--4"
                    />
                    <TextField
                        id="floating-password-r"
                        label="Enter your password"
                        type="password"
                        className="md-cell md-cell--4"
                    />

                    <Button type="submit" className="md-cell md-cell--4" style={{ marginTop: 27 }} flat primary swapTheming>Register</Button>
                </form>

            </div>
        );
    }

}