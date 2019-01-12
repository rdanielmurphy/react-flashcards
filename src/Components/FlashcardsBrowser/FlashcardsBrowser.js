import React, { Component } from 'react';
import FlashcardsContainer from '../FlashcardsContainer/FlashcardsContainer';
import './FlashcardsBrowser.css';
import { Link, Redirect } from 'react-router-dom'
import StaticDataService from '../../Services/StaticDataService';
import Typography from '@material-ui/core/Typography';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

class FlashcardsBrowser extends Component {
    componentDidMount() {
        this.setAppTitle();
    }

    componentDidUpdate() {
        this.setAppTitle();
    }

    setAppTitle() {
        let flashcardData = StaticDataService.getCards()[this.props.match.params.id];
        if (flashcardData) {
            document.title = flashcardData.name + ' Flashcards';
        }
    }

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
        let flashcardData = StaticDataService.getCards()[this.props.match.params.id];

        // no params
        if (!this.props.match.params.id) {
            let firstInList = Object.keys(StaticDataService.getCards())[0];
            return <Redirect to={'/' + firstInList + '/1'} />
        }
        // valid URL
        else if (flashcardData) {
            // get current card number
            let currentCardNumber = -1;
            if (this.props.match.params.number !== "finish") {
                currentCardNumber = parseInt(this.props.match.params.number, 10);
            }

            // bad range...redirect
            if (this.props.match.params.number !== "finish" &&
                (currentCardNumber > flashcardData.cards.questions.length || currentCardNumber < 1 || isNaN(currentCardNumber))) {
                return <Redirect to={'/' + this.props.match.params.id + '/1'} /> //bad range
            }

            // good range
            let backUrl = this.getBackUrl(flashcardData, this.props.match.params);
            let nextUrl = this.getNextUrl(flashcardData, this.props.match.params);

            // build header status
            let headerStatus = ' Finished!';
            if (this.props.match.params.number !== "finish") {
                headerStatus = " (" + currentCardNumber + "/" + flashcardData.cards.questions.length + ")";
            }

            return (
                <div>
                    <Typography variant="h5" color="inherit" className='flashcardsHeader'>
                        {flashcardData.name + headerStatus}
                    </Typography>
                    <FlashcardsContainer groupId={this.props.match.params.id} cardNum={this.props.match.params.number}></FlashcardsContainer>
                    <div className={'card__actions'}>
                        <Fab className={'card__action__button'} aria-label="Previous Flashcard" color="primary" disabled={!backUrl} component={Link} to={backUrl ? backUrl : ''}>
                            <ArrowLeft fontSize="large" disabled={!backUrl}></ArrowLeft>
                        </Fab>
                        <Fab className={'card__action__button'} aria-label="Next Flashcard" color="primary" disabled={!nextUrl} component={Link} to={nextUrl ? nextUrl : ''}>
                            <ArrowRight fontSize="large" disabled={!nextUrl}></ArrowRight>
                        </Fab>
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