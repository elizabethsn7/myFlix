import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registeredUser: null
    };
  }

  getMovies(token) {
    axios
      .get("https://liz-flix.herokuapp.com/movies", {
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
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  // method, onLoggedIn, will be passed as a prop with the same name to LoginView
  //will update the user state of the MainView component and will be called when the user has successfully logged in

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  handleLogOut() {
    this.setState({
      user: null
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  onRegistered(registeredUser) {
    this.setState({
      registeredUser
    });
  }

  backButton(movie) {
    this.setState({
      selectedMovie: null
    });
  }
  render() {
    const { movies, selectedMovie, registeredUser, user } = this.state;

    if (!user)
      return (
        <LoginView
          onLoggedIn={user =>
            // LoginView is rendered as long as there's no user in the state
            this.onLoggedIn(user)
          }
        />
      );

    if (!registeredUser)
      return (
        <RegistrationView
          onRegistered={registeredUser =>
            // RegistrationView is rendered as long as there's no user in the state
            this.onRegistered(registeredUser)
          }
        />
      );

    //Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <Row>
          <Col xs={8}>
            <div className="main-view">
              {selectedMovie ? (
                <MovieView
                  movie={selectedMovie}
                  onClick={button => this.backButton()}
                />
              ) : (
                movies.map(movie => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                ))
              )}
            </div>
          </Col>
          <Col xs={4}>
            <Button variant="danger" onClick={() => this.handleLogOut()}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
