import React, { Component } from 'react';
import './App.css';
import FlashcardsContainer from './Components/FlashcardsContainer/FlashcardsContainer';
import { slide as Menu } from 'react-burger-menu'
import FA from 'react-fontawesome'
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
    this._child.setFlashcards(Object.keys(FlashCardData)[0]);
  }

  render() {
    const scope = this;

    const getObjects = () => {
      const objs = []
      for (var key in FlashCardData) {
        objs.push(<a id={key} key={key} className="menu-item" href="#" name={FlashCardData[key].name} onClick={this.handleClick.bind(this)}><FA name={FlashCardData[key].fa} />&nbsp;&nbsp;&nbsp;<span>{FlashCardData[key].name}</span></a>)
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
        <FlashcardsContainer ref={(child) => { this._child = child; }}></FlashcardsContainer>
        <div className={'card__actions'}>
          <div
            className='card__button card__prev-button'
            onClick={() => {
              scope._child.showPrevCard();
            }}
          >
            <span className={'fa fa-arrow-circle-left fa-3x'} />
          </div>
          {/* <div
            className='card__button card__prev-button'
            onClick={() => {
              this.props.showPrevCard();
              this.setState({ showAnswer: false });
            }}
          >
            <span className={'fa fa-thumbs-down fa-3x'} />
          </div>
          <div
            className='card__button card__next-button'
            onClick={() => {
              this.props.showNextCard();
              this.setState({ showAnswer: false });
            }}
          >
            <span className={'fa fa-thumbs-up fa-3x'} />
          </div> */}
          <div
            className='card__button card__next-button'
            onClick={() => {
              scope._child.showNextCard();
            }}
          >
            <span className={'fa fa-arrow-circle-right fa-3x'} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
