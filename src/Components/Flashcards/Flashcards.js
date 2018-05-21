import React from 'react';
import './Flashcards.css';
import ReactMarkdown from 'react-markdown';
import FlashCardData from '../../data/flashcard.data';
import Flashcard from '../Flashcard/Flashcard'

class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: FlashCardData.js.cards,
      cardNumber: 0
    };
    this.state.cardNumber === this.state.cards.questions.length + 1 ? false : this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
    this.currentCard = undefined;
  }

  setFlashcards(cardsId) {
    if (this.currentCard) {
      this.currentCard.reset();
    }

    this.setState({
      cards: FlashCardData[cardsId].cards,
      name: FlashCardData[cardsId].name,
      cardNumber: 0
    }, function () {
      if (this.listener) {
        this.listener(this.state.name, this.state.cardNumber, this.state.cards.questions.length);
      }
    });
  }

  showNextCard() {
    if (this.state.cardNumber < this.state.cards.questions.length - 1) {
      this.setState({ cardNumber: this.state.cardNumber += 1 }, function () {
        if (this.listener) {
          this.listener(this.state.name, this.state.cardNumber, this.state.cards.questions.length);
        }
      });
    } else {
      alert("Finished!");
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({ cardNumber: this.state.cardNumber -= 1 }, function () {
        if (this.listener) {
          this.listener(this.state.name, this.state.cardNumber, this.state.cards.questions.length);
        }
      });
    }
  }

  addFlashcardChangeListener(listener) {
    this.listener = listener;
  }

  generateCards() {
    const cards = this.state.cards;
    const cardsList = cards.questions.map((card) => {
      return (<Flashcard
          ref={(comp) => this.currentCard = comp}
          frontContent={card.question}
          backContent={card.answer}
          showNextCard={this.boundShowNextCard}
          showPrevCard={this.boundShowPrevCard}
          cardNumber={this.state.cardNumber}
        />)
    });

    return (cardsList[this.state.cardNumber]);
  }

  render() {
    return (
      <div className="container gridContainer">
        <div className="row">
          <div className="col-md-12">
            {this.generateCards()}
          </div>
        </div>
      </div>
    );
  }
}

export default CardContainer;