import * as actionTypes from './actionTypes';

export const setSearchField = text => {
    return {
        type: actionTypes.SET_SEARCH_FIELD,
        userInput: text
    };
};

export const requestRobots = () => dispatch => {
    dispatch({ type: actionTypes.REQUEST_ROBOTS_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => dispatch({ type: actionTypes.REQUEST_ROBOTS_SUCCESS, payload: data}))
    .catch(err => dispatch({ type: actionTypes.REQUEST_ROBOTS_FAILED, payload: err }));
};

