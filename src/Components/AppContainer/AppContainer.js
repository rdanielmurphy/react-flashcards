import React, { Component } from 'react';
import './AppContainer.css';
import FlashcardsBrowser from '../FlashcardsBrowser/FlashcardsBrowser';
import NavBar from '../NavBar/NavBar';
import { Switch, Route } from 'react-router-dom';

class AppContainer extends Component {

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Switch>
                    <Route path='/:id/:number' component={FlashcardsBrowser} />
                </Switch>
            </div>
        );
    }
}

export default AppContainer;