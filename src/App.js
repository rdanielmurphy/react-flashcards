import React, { Component } from 'react';
import './App.css';
import AppContainer from './Components/AppContainer/AppContainer';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
