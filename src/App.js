import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Words from './components/Words';
import Images from './components/Images'

import {BrowserRouter as Router,  Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Main}/>
        <Route exact path="/words" component={Words}/>
        <Route exact path="/getImages/:word" component={Images}/>
        
                   
        
      </div>
      </Router>
    );
  }
}

export default App;
