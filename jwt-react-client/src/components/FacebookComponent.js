import React, { Component } from 'react';
import { Button } from 'react-md';

export default class FacebookComponent extends Component{

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
        if (!result.status)
        {
            this.failed = true;
            this.error = result.error;
            this.errorDescription = result.errorDescription;
        }
        else
        {
            this.failed = false;
            this.isRequesting = true;
          
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