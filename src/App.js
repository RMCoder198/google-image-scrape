import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Words from './Words';
import Images from './Images'

import {BrowserRouter as Router,  Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Main}/>
        <Route exact path="/words" component={Words}/>
        <Route exact path="/images/:word" component={Images}/>
        
                   
        
      </div>
      </Router>
    );
  }
}

export default App;
