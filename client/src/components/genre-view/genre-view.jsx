import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movie } = this.props;
    if (!movie) return null;

    return (
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
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <Link to={"/movies"}>
          <Button variant="link">Back</Button>
        </Link>
        <Link to={"/director/${movie.Director.Name}"}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={"/genre/${movie.Genre.Name}"}>
          <Button variant="link">Genre</Button>
        </Link>
      </div>
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
