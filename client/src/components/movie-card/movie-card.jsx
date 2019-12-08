import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    // This is given to the < MovieCard/> component by the outer world
    // which in this case is  'MainView', as 'MainView'
    // is what's connected to your database via the movies
    // endpoint of your API
    const { movie, onClick } = this.props;
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <CardColumns>
              <Card style={{ width: "16rem" }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Button onClick={() => onClick(movie)} variant="danger">
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
