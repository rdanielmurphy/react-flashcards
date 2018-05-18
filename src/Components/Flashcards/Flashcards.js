import React from 'react';
import './Flashcards.css';
import ReactMarkdown from 'react-markdown';
import FlashCardData from '../../data/flashcard.data';

class Card extends React.Component {

  constructor() {
    super();
    this.state = {
      showAnswer: false
    }
  }

  reset() {
    this.setState({showAnswer : false});
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
        onClick={() => this.setState({ showAnswer: !this.state.showAnswer })}
      >
        <div
          className='card__flip-card'
          onClick={() => {
            this.setState({ showAnswer: !this.state.showAnswer });
          }}
        >
          <span className={'fa fa-${iconClass}'} />
        </div>
        <div className="markdownContainer">
          <ReactMarkdown className={'card__content--' + contentClass} source={content} />
        </div>
        <div className={'card__actions ' + actionClass}>
          <div
            className='card__prev-button'
            onClick={() => {
              this.props.showPrevCard();
              this.setState({ showAnswer: false });
            }}
          >
            Prev
          </div>
          <div
            className='card__next-button'
            onClick={() => {
              this.props.showNextCard();
              this.setState({ showAnswer: false });
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
      return (<Card
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