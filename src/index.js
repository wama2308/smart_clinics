import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import {Provider} from 'react-redux'
import {setState} from './actions/authActions'
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

store.dispatch(setState());

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,

    document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
