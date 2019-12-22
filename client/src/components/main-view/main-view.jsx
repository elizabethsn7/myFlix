import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar } from "../movie-card/movie-card";
import { MovieCard } from "../movie-card/movie-card";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import Button from "react-bootstrap/Button";
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
        console.log(error + "From_getMovies_Method");
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
  // method, onLoggedIn, will be passed as a prop with the same name to LoginView
  //will update the user state of the MainView component and will be called when the user has successfully logged in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.Username);
    this.getMovies(authData.token);
  }

  onLogout(authData) {
    this.setState({
      user: null
    });
    window.open("/", "_self");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  render() {
    const { movies, user, userInfo } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Button variant="danger" onClick={() => this.onLogout()}>
            Logout
          </Button>

          <Link to={`/users/${user}`}>
            <Button className="btn-primary">Profile</Button>
          </Link>

          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
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
            path="/Genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
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
            path="/users/:Username"
            render={({ match }) => {
              return <ProfileView userInfo={user} />;
            }}
          />
        </div>
      </Router>
    );
  }
}
