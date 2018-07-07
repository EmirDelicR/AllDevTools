import React, { Component } from 'react';

export default class Header extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return (
            <h1 className='f1'>RoboFriends</h1>
        );
    }
}
