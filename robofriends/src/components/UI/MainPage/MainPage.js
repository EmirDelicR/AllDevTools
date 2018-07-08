import React, { Component } from 'react';
import CardList from '../CardList/CardList';
import SearchBox from '../SearchBox/SearchBox';
import Scroll from '../Scroll/Scroll';
import ErrorBoundry from '../../ErrorBoundry/ErrorBoundry';
import Header from '../Header/Header';

class MainPage extends Component {

  componentDidMount() {
    this.props.onRequestRobots()
  }

  filterRobots = () => {
    return this.props.robots.filter(robot => 
        robot.name.toLocaleLowerCase().includes(this.props.searchField.toLocaleLowerCase())
      );
  } 

  render() {

    return this.props.isPending ? 
      <h1>Loading</h1> :
      (
      <div className='tc' >
        <Header />
        <SearchBox searchChange={this.props.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
             <CardList robots={this.filterRobots()} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default MainPage;
