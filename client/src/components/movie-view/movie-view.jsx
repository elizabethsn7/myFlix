/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export function MovieView(props) {
  const { movie } = props;
  if (!movie) return null;

  /**
   * add the current movie to your favorite list
   * @function handleSubmit
   * @param {event} onClick
   * @returns {alert} - movie added to favorites
   */
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        `https://liz-flix.herokuapp.com/users/${localStorage.getItem(
          'user',
        )}/movies/${movie._id}`,
        {
          Username: localStorage.getItem('user'),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then((response) => {
        console.log(response);
        alert('Movie has been added to your Favorite List!');
      })
      .catch((event) => {
        console.log('error adding movie to favorites');
        alert('Movie not added to favorites!');
      });
  }

  return (
    <Container>
      <Row>
        <div className="movie-view">
          <img className="movie-poster" src={ movie.ImagePath } alt="movie poster" />
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{ movie.Title }</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{ movie.Description }</span>
          </div>
          <div>
            <span className="label">Genre: </span>
            <span className="value">{ movie.Genre.Name }</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{ movie.Director.Name }</span>
          </div>
          <Link to="/">
            <Button className="movie-view-buttons" size="sm">
              Back
            </Button>
          </Link>
          <Link to={ `/directors/${movie.Director.Name}` }>
            <Button className="movie-view-buttons" size="sm">
              Director
            </Button>
          </Link>
          <Link to={ `/genres/${movie.Genre.Name}` }>
            <Button className="movie-view-buttons" size="sm">
              Genre
            </Button>
          </Link>
          <Button
            className="movie-view-buttons"
            size="sm"
            onClick={ (event) => handleSubmit(event) }
          >
            { ' ' }
            Add to Favorites
            { ' ' }
          </Button>
        </div>
      </Row>
    </Container>
  );
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieView;
