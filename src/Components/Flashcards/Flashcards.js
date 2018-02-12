import React from 'react';
import Immutable from 'immutable';
import './Flashcards.css';
import ReactMarkdown from 'react-markdown';
import jsData from '../../data/javascript.json';
import javaData from '../../data/java.json';
import theoryData from '../../data/theory.json';
import puzzlesData from '../../data/puzzles.json';
import blockchainData from '../../data/blockchain.json';
import greData from '../../data/gre.json';

var dataMapping = {
    "js" : {
        "name" : "JavaScript",
        "cards" : jsData
    },
    "java" :  {
        "name" : "Java",
        "cards" : javaData
    },
    "theory" :  {
        "name" : "CS Theory",
        "cards" : theoryData
    },
    "puzzles" :  {
        "name" : "Puzzles",
        "cards" : puzzlesData
    },
    "gre" :  {
        "name" : "GRE Vocab",
        "cards" : greData
    },
    "blockchain" :  {
        "name" : "Blockchain",
        "cards" : blockchainData
    }
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      text : ""
    }
  }

  setText(text) {
    this.setState({
      text: text
    });
  }
    
  render() {
    return (
      <div className='header'>
        <div className='header-content header-content__left'>
          
        </div>
        <div className='header-content header-content__middle'>
          {this.state.text} Flash Cards
        </div>
        <div className='header-content header-content__right'>
          
        </div>
      </div>
    )
  }
}

class Card extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showAnswer: false
    }
  }
 
  render() {
    const content = this.state.showAnswer ? this.props.backContent : this.props.frontContent;
    const iconClass = this.state.showAnswer ? 'reply' : 'share';
    const cardClass = this.state.showAnswer ? 'back' : '';
    const contentClass = this.state.showAnswer ? 'back' : 'front';
    const actionClass = this.state.showAnswer ? 'active' : '';

    return (
      <div 
        className={'card ' + cardClass}
        onClick={() => this.setState({showAnswer: !this.state.showAnswer})}
      >
      <span className='card__counter'>{this.props.cardNumber + 1}</span>
        <div 
          className='card__flip-card'
          onClick={ () => {
            this.setState({showAnswer: !this.state.showAnswer});
          }}
        >

          <span className={'fa fa-${iconClass}'}/>
        </div>
        <ReactMarkdown className={'card__content--' + contentClass} source={content} />
        <div className={'card__actions ' +  actionClass}>
          <div 
            className='card__prev-button'
            onClick={() => {
              this.props.showPrevCard();
              this.setState({showAnswer: false});
            }}
          >
            Prev
          </div>
          <div 
            className='card__next-button'
            onClick={() => {
              this.props.showNextCard();
              this.setState({showAnswer: false});
            }}
          >
            Next
          </div>
        </div>
      </div>
    );
  }
}

class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: jsData,
      cardNumber: 0
    };
    this.state.cardNumber === this.state.cards.questions.length + 1 ? false : this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }
    
  setFlashcards(cardsId) {
    this._header.setText(dataMapping[cardsId].name);
    this.setState({
      cards: dataMapping[cardsId].cards,
      cardNumber: 0
    });
  }
  
  showNextCard() {
    if (this.state.cardNumber < this.state.cards.questions.length - 1) {
        this.setState({cardNumber: this.state.cardNumber += 1});
    } else {
        alert("Finsihed!");
    }
  }
  
  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({cardNumber: this.state.cardNumber -= 1});
    }
  }
  
  setCard(card) {
    const newCards = this.state.cards.push(card);
    this.setState({cards: newCards});
  }
  
  generateCount() {
    const times = this.state.cards.questions.length;
    const s = (this.state.cardNumber + 1) + " / " + times;
    return (<div>
            {s}
            </div>);
  }
  
  generateCards() {
    const cards = this.state.cards;
     const cardsList = cards.questions.map((card) => {
        return (
          <Card 
            frontContent={card.question}
            backContent={card.answer}
            showNextCard={this.boundShowNextCard}
            showPrevCard = {this.boundShowPrevCard}
            cardNumber={this.state.cardNumber}
          />
          );
      })
     return(cardsList[this.state.cardNumber]); 
  }

  render() {
    return (
      <div>
        <Header ref={(header) => { this._header = header; }}/>
        {this.generateCards()}
        <div className='card-container__dots-wrapper'>
          {this.generateCount()}
        </div>
      </div>
   );
  }
}

export default CardContainer;