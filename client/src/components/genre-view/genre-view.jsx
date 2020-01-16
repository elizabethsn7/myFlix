import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./genre-view.scss";

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
          <Col>
            <div>
              <div className="genre-name">{genre.Name}</div>
              <div className="genre-description">
                <span className="value">{genre.Description}</span>
              </div>
              <Link to={`/`}>
                <Button className="backButton">Back to Movies</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
