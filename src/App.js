import React, { Component } from 'react';
import './App.css';
import Flashcards from './Components/Flashcards/Flashcards';
import { slide as Menu } from 'react-burger-menu'
import FA from 'react-fontawesome'

class App extends Component {

  handleClick = (e) => {
      this._child.setFlashcards(e.currentTarget.id);
      
      this._menu.setState({isOpen : false});
  }
  
  componentDidMount() {
      this._child.setFlashcards("js");
  }
  
  render() {
    return (
      <div className="App">
      <Menu ref={(menu) => { this._menu = menu; }}>
        <a id="js" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="code" />&nbsp;&nbsp;&nbsp;<span>JavaScript</span></a>
        <a id="htmlcss" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="html5" />&nbsp;&nbsp;&nbsp;&nbsp;<span>HTML/CSS</span></a>
        <a id="java" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="terminal" />&nbsp;&nbsp;&nbsp;<span>Java</span></a>
        <a id="theory" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="linux" />&nbsp;&nbsp;&nbsp;<span>CS Theory</span></a>
        <a id="puzzles" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="puzzle-piece" />&nbsp;&nbsp;&nbsp;<span>Puzzles</span></a>
        <a id="gre" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="font" />&nbsp;&nbsp;&nbsp;<span>GRE Vocab</span></a>
        <a id="blockchain" className="menu-item" href="#" onClick={this.handleClick.bind(this)}><FA name="bitcoin" />&nbsp;&nbsp;&nbsp;&nbsp;<span>Blockchain</span></a>
      </Menu>
        <Flashcards ref={(child) => { this._child = child; }}></Flashcards>
      </div>
    );
  }
}

export default App;
