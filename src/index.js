import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap/bootstrap.min.css';

var head = document.getElementsByTagName('head')[0];
var robotoLink = document.createElement('link');
robotoLink.rel = 'stylesheet';
robotoLink.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
head.appendChild(robotoLink);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
