export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_FAVORITES = 'SET_FAVORITES';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setFavorites(value) {
  return { type: SET_FAVORITES, value};
}

// this is pseudo code, it's just a draft of our app's state
//what the state should look like before looking at how it can be modified.
//A SET_MOVIES action will initialize the movies property; a SET_FILTER action will change the visibilityFilter property.
{
  visibilityFilter: string,
  movies: [
    {Title, Description, ImagePath, Genre, Director}
    //...
  ],
  favorites: [
    {movieTitle}
    
  ]
}
