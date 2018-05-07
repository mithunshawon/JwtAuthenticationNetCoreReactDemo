import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText, Button } from 'react-md';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export class HomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedOff: !localStorage.length,
            firstName: '',
            lastName: '',
            location: '',
            gender: '',
        }
    }

    logOut = () => {
        localStorage.clear();
        this.setState(() => ({
            loggedOff: !localStorage.length
        }));
    }

    handleLogOff = () => {
        this.logOut();
    }

    componentDidMount() {
        const { loggedOff } = this.state;
        if (!loggedOff) {
            axios.get('http://localhost:50686/api/home', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                }
            })
                .then(response => {
                    if (response) {
                        this.setState(() => ({
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            location: response.data.location,
                            gender: response.data.gender,
                        }));
                    }
                }).catch(error => {
                    this.logOut();
                });
        }
    }

    render() {
        if (this.state.loggedOff) return <Redirect to='/' />

        return (
            <Card style={{ maxWidth: 600 }} className="md-block-centered">
                <CardTitle
                    title={`Username: ${this.state.firstName} ${this.state.lastName}`}
                />
                <CardActions expander>
                    <Button flat secondary swapTheming onClick={this.handleLogOff}>Log off</Button>
                </CardActions>
                <CardText expandable>
                    <p>Location : {this.state.location}</p>
                    <p>Gender : {this.state.gender}</p>
                </CardText>
            </Card>

        );
    }
}
