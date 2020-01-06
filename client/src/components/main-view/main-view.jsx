import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-view/profile-update";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { Link } from "react-router-dom";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      email: "",
      birthday: "",
      userInfo: {}
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
        localStorage.setItem("movies", JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getUser(token) {
    axios
      .get("https://liz-flix.herokuapp.com/users/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          email: response.data.Email,
          birthday: response.data.Birthday,
          token: token,
          userInfo: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem("user", data.Username);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }
  onMovieClick(movie) {
    window.location.hash = "#" + movie._id;
    this.setState({
      selectedMovieId: movie._id
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
    this.setState({
      userInfo: authData.user
    });
  }

  handleLogOut(authData) {
    this.setState({
      user: null
    });
    window.open("/", "_self");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("movies");
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }

  render() {
    const { movies, userInfo, user, token } = this.state;

    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        <Router>
          <Container-fluid>
            <Row className="rowBackground">
              <Button
                className="fonts"
                variant="link"
                onClick={() => this.handleLogOut()}>
                Logout
              </Button>
              <Link to={`/users/${user}`}>
                <Button className="fonts" variant="link">
                  Profile
                </Button>
              </Link>
              <Route path={`/users/${user}`} component={ProfileView} />
            </Row>
            <Row>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );
                  return movies.map(m => <MovieCard key={m._id} movie={m} />);
                }}
              />
              <Route path="/register" render={() => <RegistrationView />} />
              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                )}
              />
              <Route
                path="/genres/:name"
                render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return (
                    <GenreView
                      genre={
                        movies.find(m => m.Genre.Name === match.params.name)
                          .Genre
                      }
                    />
                  );
                }}
              />
              <Route
                path="/directors/:name"
                render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
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

              <Route
                path="/update/:Username"
                render={() => (
                  <ProfileUpdate
                    userInfo={userInfo}
                    user={user}
                    token={token}
                    updateUser={data => this.updateUser(data)}
                  />
                )}
              />
            </Row>
          </Container-fluid>
        </Router>
      </div>
    );
  }
}
