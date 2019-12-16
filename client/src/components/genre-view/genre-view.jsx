import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { genre } = this.props;
    if (!genre) return null;

    return (
      <Container>
        <Row>
          <Col sm={6}>
            <CardColumns>
              <Card style={{ width: "16rem" }}>
                <Card.Body>
                  <Card.Title>{genre.Name}</Card.Title>
                  <Card.Text>Genre Description: {genre.Description}</Card.Text>
                  <Link to={`/`}>
                    <Button variant="link">Back</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }
}
