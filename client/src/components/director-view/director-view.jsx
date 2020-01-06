import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./director-view.scss";
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
          <div>
            <div className="director-name">{director.Name}</div>
            <div className="director-bio">
              <span className="value">{director.Bio}</span>
            </div>
            <div className="director-bio">
              <span className="value">{director.Birth}</span>
            </div>
            <Link to={`/`}>
              <Button className="backButton">Back to Movies</Button>
            </Link>
          </div>
        </Row>
      </Container>
    );
  }
}
