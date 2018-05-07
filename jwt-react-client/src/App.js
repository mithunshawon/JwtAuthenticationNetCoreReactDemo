import React, { Component } from 'react';
import './App.css';
import { MainContainerComponent } from './components/MainContainerComponent';
import { Route } from "react-router-dom";
import { HomeComponent } from './components/HomeComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="md-paper md-paper--0 md-card md-background--card md-cell md-cell--12">
          <h1 className="App-title">Welcome to JWT Authentication</h1>
          <Route exact path="/" component={MainContainerComponent} />
          <Route path="/home" component={HomeComponent} />
        </div>
      </div>
    );
  }
}

export default App;
