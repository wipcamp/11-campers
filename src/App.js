import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'
require('dotenv').config()

class App extends Component {
  render() {
    return (
        <Routes />
    );
  }
}

export default App;