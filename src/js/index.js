import '../scss/style.scss';
import '../img/arrow-down.svg';
import '../img/arrow-up.svg';
import '../img/minus.svg';
import '../img/plus.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer, {Operation} from './reducer.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);


store.dispatch(Operation.loadModifiers());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
