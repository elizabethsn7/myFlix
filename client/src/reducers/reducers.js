import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  TOGGLE_FAVORITES
} from "../actions/actions";

// visibilityFilter is a function (aka reducer)
//Each reducer takes a state and an action, and if it’s concerned by the action, it changes the state and is only cares about what its responsible for.
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function loggedInUser(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function toggleFavorites(state = [], action) {
  switch (action.type) {
    case TOGGLE_FAVORITES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  loggedInUser,
  toggleFavorites
});

export default moviesApp;
