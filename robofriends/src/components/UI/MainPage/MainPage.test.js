import { shallow, mount, render } from 'enzyme';
import MainPage from './MainPage';
import React from 'react';

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    }
    wrapper = shallow(<MainPage { ...mockProps } />);
})
it('expect to render MainPage component', () => {
    expect(wrapper).toMatchSnapshot();
});

it('it filters robots correctly', () => {
    expect(wrapper.instance().filterRobots()).toEqual([]);
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [
            {
                id: 3,
                name: 'john'
            }
        ],
        searchField: 'john',
        isPending: false
    }
    const wrapper2 = shallow(<MainPage { ...mockProps2 } />)
    expect(wrapper.instance().filterRobots([])).toEqual([]);
    expect(wrapper2.instance().filterRobots([])).toEqual([{ id: 3, name: 'john'}]);
});
