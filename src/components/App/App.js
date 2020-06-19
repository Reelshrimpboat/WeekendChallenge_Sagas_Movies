import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import List from '../List/List'

class App extends Component {
  // Renders the entire app on the DOM

  //launches on page load and fires off functions
  componentDidMount() {
    this.getMovies();
  }

  //sends dispatch to index.js to get movies from database
  getMovies = () => {
    this.props.dispatch({
      type: 'GET_MOVIES'
    })
    console.log('Get Movies');
  }

  render() {
    return (
      <div className="App">
        <List />
      </div>
    );
  }
}

export default connect()(App);
