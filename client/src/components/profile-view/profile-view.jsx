import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss';

const mapStateToProps = (state) => {
  const {movies} = state;
  return {movies};
};

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  /**
     * gets user info to display & sets the state
     * @param {number} token
     * @return {object} user information
     */
  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://liz-flix.herokuapp.com/users/${username}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.FavoriteMovies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
    * removes favorite movie from list
    * @param {number} movieId
    * @return {alert} removed id from favorite list
  */
  deleteMovieFromFavs(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    axios
      .delete(
        `https://liz-flix.herokuapp.com/users/${localStorage.getItem(
          'user',
        )}/movies/${favoriteMovie}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      )
      .then((response) => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch((event) => {
        alert('something went wrong.');
      });
  }

  handleChange(e) {
    this.setState({[ e.target.name ]: e.target.value});
  }

  render() {
    const {
      username, email, birthday, favorites,
    } = this.state;
    const movies = this.props;
    console.log(favorites);

    return (
      <Card className="profile-view" style={{width: '32rem'}}>
        <Card.Body>
          <Card.Title className="profile-title">Profile</Card.Title>
          <ListGroup className="user-name">
            <ListGroup.Item>
              Username:
              {' '}
              {username}
            </ListGroup.Item>
            <ListGroup.Item>
              E-Mail:
              {' '}
              {email}
            </ListGroup.Item>
            <ListGroup.Item>
              Birthday:
              {' '}
              {birthday}
            </ListGroup.Item>
            <ListGroup.Item>
              Favorites:
              <div>
                {favorites.length === 0 && (
                  <div className="value">No favorites added</div>
                )}
                {favorites.length > 0 && (
                  <ul>
                    {favorites.map((favoriteMovie) => (
                      <li key={favoriteMovie}>
                        <p>
                          <Link to={`/movies/${favoriteMovie}`}>
                            <h5 className="movie-link link">
                              {
                                JSON.parse(localStorage.getItem('movies')).find(
                                  (movie) => movie._id === favoriteMovie,
                                ).Title
                              }
                            </h5>
                          </Link>
                        </p>
                        <Button
                          className="submitButton"
                          size="sm"
                          onClick={(event) => this.deleteMovieFromFavs(event, favoriteMovie)}
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <div>
          <Link to="/">
            <Button className="submitButton">Back to Movies</Button>
          </Link>
          <Link to="/update/:Username">
            <Button className="submitButton">Update profile</Button>
          </Link>
        </div>
      </Card>
    );
  }
}
export default connect(mapStateToProps)(ProfileView);
