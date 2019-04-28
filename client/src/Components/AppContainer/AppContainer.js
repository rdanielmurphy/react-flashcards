import React, { Component } from 'react';
import './AppContainer.css';
import FlashcardsBrowser from '../FlashcardsBrowser/FlashcardsBrowser';
import NavBar from '../NavBar/NavBar';
import { Switch, Route } from 'react-router-dom';
import StaticDataService from '../../Services/StaticDataService';
import CircularProgress from '@material-ui/core/CircularProgress';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        StaticDataService.loadCards().then(() => {
            this.setState({ loaded: true });
        });
    }

    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <NavBar></NavBar>
                    <Switch>
                        <Route path='/:id/:number' component={FlashcardsBrowser} />
                        <Route path='*' component={FlashcardsBrowser} />
                    </Switch>
                </div>
            );
        } else {
            return (
                <div className="loading">
                    <h2> Loading ... </h2>
                    <CircularProgress size={100} />
                </div>
            );
        }
    }
}

export default AppContainer;