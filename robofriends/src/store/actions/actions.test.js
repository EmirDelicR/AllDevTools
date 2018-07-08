import * as actions from './actions'
import * as actionTypes from './actionTypes'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

export const mockStore = configureMockStore([thunkMiddleware]);

describe('actions', () => {
  it('should create an action to search', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: actionTypes.SET_SEARCH_FIELD ,
      userInput: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction)
  })
})

describe("Fetch robots action PENDING", () => {
  it("should creat a Pending action on request Robots", () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots())
    const action = store.getActions();
    expect(action[0]).toEqual({type: "REQUEST_ROBOTS_PENDING"});
  });
});