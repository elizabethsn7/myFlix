/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Container fluid>
      <div className="movies-list">
        <VisibilityFilterInput visibilityFilter={ visibilityFilter } />
      </div>
      <Row className="justify-content-md-center">
        { filteredMovies.map((m) => (
          <Col xs="auto">
            <MovieCard className="mvLstRow" key={ m._id } movie={ m } />
          </Col>
        )) }
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps)(MoviesList);
