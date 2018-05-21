import React, { Component } from 'react';
import './App.css';
import Flashcards from './Components/Flashcards/Flashcards';
import { slide as Menu } from 'react-burger-menu'
import FA from 'react-fontawesome'
import { Navbar, NavItem } from 'react-bootstrap'
import FlashCardData from './data/flashcard.data';

class App extends Component {

  handleClick = (e) => {
    this.setState({ name: e.currentTarget.name, count: "" });
    this._child.setFlashcards(e.currentTarget.id);
    this._menu.setState({ isOpen: false });
  }

  componentDidMount() {
    var scope = this;
    this._child.addFlashcardChangeListener(function(name, current, max) {
      let result = (current + 1) + "/" + max;
      scope.setState({ name: name, count: result });
    });
    this._child.setFlashcards("js");
  }

  render() {
    const getObjects = () => {
      const objs = []
      for (var key in FlashCardData) {
        objs.push(<a id={key} className="menu-item" href="#" name={FlashCardData[key].name} onClick={this.handleClick.bind(this)}><FA name={FlashCardData[key].fa} />&nbsp;&nbsp;&nbsp;<span>{FlashCardData[key].name}</span></a>)
      }
    
      return objs;
    }
    
    return (
      <div className="App">
        <div className="flashcardnavbar">
          <h4 className="navbarHeader">
            Flashcards
          </h4>
          <h6 className="navbarSubHeader">
            { this.state ? (this.state.name + " (" + this.state.count + ")") : "" }
          </h6>
        </div>
        <Menu ref={(menu) => { this._menu = menu; }}>
          { getObjects() }
        </Menu>
        <Flashcards ref={(child) => { this._child = child; }}></Flashcards>
      </div>
    );
  }
}

export default App;
