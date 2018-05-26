import React, { Component } from 'react';
import FlashcardsContainer from '../FlashcardsContainer/FlashcardsContainer';
import './FlashcardsBrowser.css';
import { Link } from 'react-router-dom'
import StaticDataService from '../../Services/StaticDataService';

class FlashcardsBrowser extends Component {

    getBackUrl(flashcardData, params) {
        let url;

        if (params.number === "finish") {
            // if at finish card, back button goes to last card
            url = '/' + params.id + '/' + (flashcardData.cards.questions.length);
        } else {
            let num = parseInt(params.number, 10);
            // not at beginning, go back one
            if (num > 1) {
                url = '/' + params.id + '/' + (num - 1);
            }
        }

        return url;
    }

    getNextUrl(flashcardData, params) {
        let url;

        if (params.number !== "finish") {
            let num = parseInt(params.number, 10);

            // at end so go to finish
            if (num === flashcardData.cards.questions.length) {
                url = '/' + params.id + '/finish';
            } else {
                url = '/' + params.id + '/' + (num + 1);
            }
        }

        return url;
    }

    render() {
        let flashcardData = StaticDataService.getCards(this.props.match.params.id)[this.props.match.params.id];

        // Valid URL
        if (flashcardData) {
            let backUrl = this.getBackUrl(flashcardData, this.props.match.params);
            let nextUrl = this.getNextUrl(flashcardData, this.props.match.params);

            return (
                <div>
                    <FlashcardsContainer groupId={this.props.match.params.id} cardNum={this.props.match.params.number}></FlashcardsContainer>
                    <div className={'card__actions'}>
                        {backUrl &&
                            < Link className="card__button card__prev-button" to={backUrl}>
                                <span className={'fa fa-arrow-circle-left fa-3x'} />
                            </Link>
                        }
                        {nextUrl &&
                            <Link className="card__button card__next-button" to={nextUrl}>
                                <span className={'fa fa-arrow-circle-right fa-3x'} />
                            </Link>
                        }
                    </div>
                </div >
            );
        }
        else {
            return (
                <div className="container" style={{ paddingTop: '100px' }}>
                    <h2>Page not found</h2>
                </div>
            )
        }
    }
}

export default FlashcardsBrowser;