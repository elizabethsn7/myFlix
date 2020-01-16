import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setMovies, setUser } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LoginView } from "../login-view/login-view";
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
      userInfo: {}
    };
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

  getMovies(token) {
    axios
      .get("https://liz-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
        localStorage.setItem("movies", JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getUser(token) {
    axios
      .get("https://liz-flix.herokuapp.com/users/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.props.setUser(response.data);
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

  onMovieClick(movie) {
    window.location.hash = "#" + movie._id;
    this.setState({
      selectedMovieId: movie._id
    });
  }

  handleLogOut(authData) {
    this.setState({
      user: null
    });
    // window.open("/client", "_self");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("movies");
    this.setState({
      user: null
    });
    window.open("/client", "_self");
  }

  render() {
    let { movies } = this.props;

    const { userInfo, user, token } = this.state;
    return (
      <Router basename="/client">
        <div className="main-view">
          <Container-fluid>
            <Row className="rowBackground">
              <Col md={4}>
                {!!user && (
                  <Button
                    className="fonts"
                    variant="link"
                    onClick={() => this.handleLogOut()}>
                    Logout
                  </Button>
                )}
                <Link to={`/users/${user}`}>
                  {!!user && (
                    <Button className="fonts" variant="link">
                      Profile
                    </Button>
                  )}
                  <Route path={`/users/${user}`} component={ProfileView} />
                </Link>
              </Col>
              <Col md={{ span: 2, offset: 6 }} className="branding">
                myFlix
              </Col>
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
                  return <MoviesList movies={movies} />;
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
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser
})(MainView);
