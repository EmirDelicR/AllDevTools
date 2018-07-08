import * as actionTypes from '../actions/actionTypes';
import * as reducers from './reducers';
import { updateObject } from '../../Utilitys/Utilitys';

describe('searchRobots', () => {
    it('return initial state', () => {
        expect(reducers.searchRobots(undefined, {})).toEqual({ searchField: ''})
    });

    it('handle SET_SEARCH_FIELD', () => {
        expect(reducers.searchRobots('', {
            type: actionTypes.SET_SEARCH_FIELD,
            userInput: 'abc'
        })).toEqual({ searchField: 'abc'})
    })
})

describe('requestRobots', () => {
    const initialStateRobots = {
        isPending: false,
        robots: [],
        error: ''
    };
    it('return initial state', () => {
        expect(reducers.requestRobots(undefined, {})).toEqual(initialStateRobots)
    });

    it('handle REQUEST_ROBOTS_PENDING', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: actionTypes.REQUEST_ROBOTS_PENDING 
        })).toEqual({"error": "", "isPending": true, "robots": []})
    }) 

    it('handle REQUEST_ROBOTS_SUCCESS', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: actionTypes.REQUEST_ROBOTS_SUCCESS,
            payload: [
                {
                    id: 3,
                    name: 'test'
                }
            ] 
        })).toEqual({"error": "", "isPending": false, "robots": [{"id": 3, "name": "test"}]})
    }) 

    it('handle REQUEST_ROBOTS_FAILED', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: actionTypes.REQUEST_ROBOTS_FAILED,
            payload: 'fail'
        })).toEqual({"error": "fail", "isPending": false, "robots": []})
    }) 

})