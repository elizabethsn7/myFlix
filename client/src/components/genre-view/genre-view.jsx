import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";

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
            <div className="genre-view">
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>

              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired
//     }),
//     Featured: PropTypes.bool.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//       Death: PropTypes.string
//     })
//   })
// };
