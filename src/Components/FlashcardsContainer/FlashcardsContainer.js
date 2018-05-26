import React from 'react';
import './FlashcardsContainer.css';
import StaticDataService from '../../Services/StaticDataService';
import Flashcard from '../Flashcard/Flashcard'

class FlashcardsContainer extends React.Component {

  getFinishedCard() {
    return {
      question: "Finished!  How did you do?",
      answer: null
    }
  }

  render() {
    if (this.currentCard) {
      this.currentCard.reset();
    }

    let flashcard = StaticDataService.getCard(this.props.groupId, this.props.cardNum - 1);
    let cardNum = this.props.cardNum;
    if (!flashcard) {
      flashcard = this.getFinishedCard();
      cardNum = this.props.cardNum - 1;
    }

    return (
      <div className="container gridContainer">
        <div className="row">
          <div className="col-md-12">
            <Flashcard
              ref={(comp) => this.currentCard = comp}
              frontContent={flashcard.question}
              backContent={flashcard.answer}
              cardNumber={cardNum}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FlashcardsContainer;