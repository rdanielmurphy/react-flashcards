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
    this.setState({ showAnswer: false });
  }

  render() {
    const content = this.state.showAnswer ? this.props.backContent : this.props.frontContent;
    const cardClass = this.state.showAnswer ? 'back' : '';
    const contentClass = this.state.showAnswer ? 'back' : 'front';

    return (
      <div
        className={'card ' + cardClass}
        onClick={() => {
          if (this.props.backContent) {
            this.setState({ showAnswer: !this.state.showAnswer });
          }
        }}
      >
        <div className="markdownContainer">
          <ReactMarkdown className={'card__content--' + contentClass} source={content} />
        </div>
      </div >
    );
  }
}

export default Flashcard;