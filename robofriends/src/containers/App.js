import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainPage from '../components/UI/MainPage/MainPage';
import * as actions from '../store/actions/';
class App extends Component {

  render() {
    return <MainPage { ...this.props } />
  }
}

const mapStateToProps = state => {
  return {
    searchField: state.search.searchField,
    robots: state.request.robots,
    isPending: state.request.isPending
  }
};

const mapDispatchToProps = dispatch => {
  return {
     onSearchChange: (event) => dispatch(actions.setSearchField(event.target.value)),
     onRequestRobots: () => dispatch(actions.requestRobots())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
