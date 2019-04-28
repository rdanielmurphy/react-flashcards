import React, { Component } from 'react';
import './App.css';
import AppContainer from './Components/AppContainer/AppContainer';
import { HashRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <AppContainer />
        </HashRouter>
      </div>
    );
  }
}

export default App;
