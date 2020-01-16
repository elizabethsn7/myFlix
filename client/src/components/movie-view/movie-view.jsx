import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export function MovieView(props) {
  const { movie } = props;
  if (!movie) return null;

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        `https://liz-flix.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/movies/${movie._id}`,
        {
          Username: localStorage.getItem("user")
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
        alert("Movie has been added to your Favorite List!");
      })
      .catch(event => {
        console.log("error adding movie to favorites");
        alert("Movie not added to favorites!");
      });
  }

  return (
    <Container>
      <Row>
        <div className="movie-view">
          <img className="movie-poster" src={movie.ImagePath} />
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div>
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <Link to={`/`}>
            <Button className="movie-view-buttons" size="sm">
              Back
            </Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className="movie-view-buttons" size="sm">
              Director
            </Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="movie-view-buttons" size="sm">
              Genre
            </Button>
          </Link>
          <Button
            className="movie-view-buttons"
            size="sm"
            onClick={event => handleSubmit(event)}>
            {" "}
            Add to Favorites{" "}
          </Button>
        </div>
      </Row>
    </Container>
  );
}
