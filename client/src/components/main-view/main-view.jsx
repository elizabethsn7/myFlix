import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios
      .get('https://liz-flix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // method, onLoggedIn, will be passed as a prop with the same name to LoginView
  //will update the user state of the MainView component and will be called when the user has successfully logged in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  handleLogOut() {
    this.setState({
      user: null
    });
    window.open('/', '_self');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // onRegistered(registeredUser) {
  //   this.setState({
  //     registeredUser
  //   });
  // }

  render() {
    const { movies, user } = this.state;

    if (!movies) return <div className='main-view' />;

    // if (!registeredUser)
    //   return (
    //     <RegistrationView
    //       onRegistered={registeredUser =>
    //         // RegistrationView is rendered as long as there's no user in the state
    //         this.onRegistered(registeredUser)
    //       }
    //     />
    //   );

    return (
      <div className='main-view'>
        <Navbar bg='danger'>
          <Navbar.Brand className='brand'>myFlix</Navbar.Brand>
          <Button variant='danger' onClick={() => this.handleLogOut()}>
            Logout
          </Button>
        </Navbar>
        <Router>
          <Route
            exact
            path='/'
            render={() => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m} />);
            }}
          />
          <Route path='/register' render={() => <RegistrationView />} />

          <Route
            path='/movies/:movieId'
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path='/Genres/:name'
            render={({ match }) => {
              if (!movies) return <div className='main-view' />;
              return (
                <GenreView
                  genre={
                    movies.find(m => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />
          <Route
            path='/directors/:name'
            render={({ match }) => {
              if (!movies) return <div className='main-view' />;
              return (
                <DirectorView
                  director={
                    movies.find(m => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
        </Router>
      </div>
    );
  }
}
