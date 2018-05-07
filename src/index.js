import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import fcData from './data/flashcard.data'
//import 'font-awesome/css/font-awesome.min.css';

var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
head.appendChild(link);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
