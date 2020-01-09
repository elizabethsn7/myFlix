export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_SORT_FILTER = "SET_SORT_FILTER";
export const SET_USER = "SET_USER";

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}
export function setSortFilter(value) {
  return {
    type: SET_SORT_FILTER,
    value
  };
}
export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}

//A SET_MOVIES action will initialize the movies property; a SET_FILTER action will change the visibilityFilter property.
