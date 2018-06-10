import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { searchRobots, requestRobots } from './store/reducers/reducers';
import thunk from 'redux-thunk';

// middleware
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching: ', action);
            const result = next(action);
            console.log('[Middleware] next state: ', store.getState());
            return result;
        }
    }
};

// Combine reducers
const rootReducer = combineReducers({
    search: searchRobots,
    request: requestRobots
});
// Store
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
