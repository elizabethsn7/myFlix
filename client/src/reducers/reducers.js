import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER } from "../actions/actions";

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

// movies is a function (aka reducer)-a  pure function; they depend on nothing but their parameters-they don't change anything. When concerned by the action, reducers simply return a new value.
// The line in the code above:
// visibilityFilter(state = '', action)
// is an identity card - Every time an action is dispatched, this reducer will be called, and it’s responsible for addressing the action or not, hence the switch-case syntax

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

// The above code is the elegant way to keep the code clean and is the same as the code below:

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   };
// }

export default moviesApp;
