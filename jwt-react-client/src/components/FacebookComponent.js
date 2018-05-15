import React, { Component } from 'react';
import { Button } from 'react-md';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class FacebookComponent extends Component{

    constructor(props){
        super(props)
        if (window.addEventListener) {
            window.addEventListener("message", this.handleMessage.bind(this), false);
          } else {
             window.attachEvent("onmessage", this.handleMessage.bind(this));
          } 
    }
    
    openFbWindow = () => {
        this.authWindow = window.open('https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=1528751870549294&display=popup&redirect_uri=http://localhost:5000/facebook-auth.html&scope=email',null,'width=600,height=400');    
    }

    handleMessage = (event) => {

        const message = event ;
        this.authWindow.close();
        const result = JSON.parse(message.data);
        const accessToken = result.accessToken;
        if (result.status)
        {
            let data = JSON.stringify({accessToken}); 
            axios.post('http://localhost:50686/api/externalauth/facebook', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response.data);
            localStorage.setItem('auth_token', response.data.auth_token);
            this.props.history.push('/home');
        })
            .catch(error => {
                alert(error);
            });  
        }        
    }

    render(){

        return (
            <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--8 md-cell--2-offset">
                <Button onClick = {this.openFbWindow} className="md-cell md-cell--4" flat primary swapTheming>Facebook Login</Button>
            </div>
        );
    }
}

export default withRouter(FacebookComponent);