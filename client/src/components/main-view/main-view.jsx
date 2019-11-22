import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor so React can initialize it
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="main-view"></div>
    )
  }
  componentDidMount() {
    axios.get('https://liz-flix.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.state;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    );
  }
}