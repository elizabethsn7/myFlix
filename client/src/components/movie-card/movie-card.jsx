import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="card">
        <Card style={{ width: "16rem" }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="movie-title">{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
