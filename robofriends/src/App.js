import React, { Component } from 'react';
import CardList from './components/UI/CardList/CardList';
import SearchBox from './components/UI/SearchBox/SearchBox';
import Scroll from './components/UI/Scroll/Scroll';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';

class App extends Component {
  state = {
    robots: [],
    searchfield: '',
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ robots: users }))
    .catch(err => console.log("Error: ", err));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => 
      robot.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase())
    );

    return (
      <div className='tc' >
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
             <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
