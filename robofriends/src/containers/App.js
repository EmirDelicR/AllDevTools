import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/UI/CardList/CardList';
import SearchBox from '../components/UI/SearchBox/SearchBox';
import Scroll from '../components/UI/Scroll/Scroll';
import ErrorBoundry from '../components/ErrorBoundry/ErrorBoundry';
import * as actions from '../store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const filteredRobots = this.props.robots.filter(robot => 
      robot.name.toLocaleLowerCase().includes(this.props.searchField.toLocaleLowerCase())
    );

    return this.props.isPending ? 
      <h1>Loading</h1> :
      (
      <div className='tc' >
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.props.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
             <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchField: state.search.searchField,
    robots: state.request.robots,
    isPending: state.request.isPending,
    errro: state.request.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
     onSearchChange: (event) => dispatch(actions.setSearchField(event.target.value)),
     onRequestRobots: () => dispatch(actions.requestRobots())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
