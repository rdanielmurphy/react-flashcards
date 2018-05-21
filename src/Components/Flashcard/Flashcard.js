import React from 'react';
import './Flashcard.css';
import ReactMarkdown from 'react-markdown';

class Flashcard extends React.Component {

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
        </div>
        <div className="markdownContainer">
          <ReactMarkdown className={'card__content--' + contentClass} source={content} />
        </div>
        <div className={'card__actions ' + actionClass}>
          <div
            className='card__button card__prev-button'
            onClick={() => {
              this.props.showPrevCard();
              this.setState({ showAnswer: false });
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
              this.props.showNextCard();
              this.setState({ showAnswer: false });
            }}
          >
            <span className={'fa fa-arrow-circle-right fa-3x'} />
          </div>
        </div>
      </div>
    );
  }
}

export default Flashcard;