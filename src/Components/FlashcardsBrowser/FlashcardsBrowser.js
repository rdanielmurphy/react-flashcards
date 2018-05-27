import React, { Component } from 'react';
import FlashcardsContainer from '../FlashcardsContainer/FlashcardsContainer';
import './FlashcardsBrowser.css';
import { Link, Redirect } from 'react-router-dom'
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
        console.log(this.props.match.params);

        let flashcardData = StaticDataService.getCards()[this.props.match.params.id];

        // no params
        if (!this.props.match.params.id) {
            let firstInList = Object.keys(StaticDataService.getCards())[0];
            return <Redirect to={'/' + firstInList + '/1'} />
        }
        // valid URL
        else if (flashcardData) {
            // check range
            if (this.props.match.params.number !== "finish") {
                let parsedInt = parseInt(this.props.match.params.number, 10);
                if (parsedInt > flashcardData.cards.questions.length || parsedInt < 1 || isNaN(parsedInt))
                    return <Redirect to={'/' + this.props.match.params.id + '/1'} /> //bad range
            }

            // good range
            let backUrl = this.getBackUrl(flashcardData, this.props.match.params);
            let nextUrl = this.getNextUrl(flashcardData, this.props.match.params);

            return (
                <div>
                    <FlashcardsContainer groupId={this.props.match.params.id} cardNum={this.props.match.params.number}></FlashcardsContainer>
                    <div className={'card__actions'}>
                        <Link className={(!backUrl ? 'disable-link' : '') + ' card__button card__prev-button'} to={backUrl ? backUrl : ''}>
                            <span className={'fa fa-arrow-circle-left fa-3x'} />
                        </Link>
                        <Link className={(!nextUrl ? 'disable-link' : '') + ' card__button card__next-button'} to={nextUrl ? nextUrl : ''}>
                            <span className={'fa fa-arrow-circle-right fa-3x'} />
                        </Link>
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