import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Utilitys/Utilitys';

const initialStateSearch = {
    searchField: ''
};

export const searchRobots = (state = initialStateSearch, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_FIELD:
            return updateObject(state, { searchField: action.userInput });
        default:
            return state;
    }
};

const initialStateRobots = {
    isPending: false,
    robots: [],
    error: ''
};

export const requestRobots = (state = initialStateRobots, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ROBOTS_PENDING:
            return updateObject(state, { isPending: true });
        case actionTypes.REQUEST_ROBOTS_SUCCESS:
            return updateObject(state, { robots: action.payload, isPending: false });
        case actionTypes.REQUEST_ROBOTS_FAILED:
            return updateObject(state, { error: action.payload, isPending: false });
        default:
            return state;
    }
};