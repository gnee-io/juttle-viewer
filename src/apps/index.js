import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from './reducers';
import observers from './observers';

import Run from './components/run';


// import sass
import 'juttle-client-library/dist/juttle-client-library.css';
import 'font-awesome/css/font-awesome.css';
import './assets/sass/main.scss';

// setup redux
let juttleServiceHost = window.JUTTLE_SERVICE_HOST || window.location.host;
const reduxRouterMiddeware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddeware, thunk)(createStore);
const store = createStoreWithMiddleware(reducers, { juttleServiceHost });
observers(store);

// setup main app
ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Run} />
        </Router>
    </Provider>
), document.getElementById('app'));
