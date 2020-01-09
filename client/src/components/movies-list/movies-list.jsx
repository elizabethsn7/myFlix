import React from "react";
import { connect } from "react-redux";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

// In the mapStateToProps function, you extracted visibilityFilter into a prop named visibilityFilter.
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter(m => m.Title.includes(visibiltyFilter));
  }
  // MoviesList's props contains two properties (the second being movies, which was passed when the component was instantiated in the render() method of the MainView component)
  if (!movies) return <div className="main-view" />;

  return (
    <div className="movie-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filterMovies.map(m => (
        <MovieCard key={m._id} movie={m} />
      ))}
    </div>
  );
}
// Now, you can filter the array movies based on the value present in visibilityFilter, then render the filtered array into a list of MovieCard components.

export default connect(mapStateToProps)(MoviesList);
// The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use.
