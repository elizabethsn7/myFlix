import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { director } = this.props;
    if (!director) return null;

    return (
      <Container>
        <Row>
          <Col sm={6}>
            <CardColumns>
              <Card style={{ width: "16rem" }}>
                <Card.Body>
                  <Card.Title>Director Name: {director.Name}</Card.Title>
                  <Card.Text>Director Bio: {director.Bio}</Card.Text>
                  <Card.Text>Director Birth: {director.Birth}</Card.Text>
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
