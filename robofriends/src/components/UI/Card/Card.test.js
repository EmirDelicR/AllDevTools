import { shallow, mount, render } from 'enzyme';
import Card from './Card';
import React from 'react';

it('expect to render one component', () => {
    expect(shallow(<Card />).length).toEqual(1);
});

it('Snapshot testing', () => {
    expect(shallow(<Card />)).toMatchSnapshot();
});