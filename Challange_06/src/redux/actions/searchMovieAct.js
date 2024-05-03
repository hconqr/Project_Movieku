import axios from "axios";
import {
  setMovies,
  setLanguage,
  setQuery,
  setYear,
} from "../reducers/searchMovieRdc";

// Action to fetch now playing movies
export const searchMovie = () => async (dispatch, getState) => {
  const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";
  const language = getState().searchMovie.language;
  const query = getState().searchMovie.query;
  const year = getState().searchMovie.year;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=${language}&page=1&year=${year}&region=EN`,
      { headers: { accept: "application/json" } }
    );
    if (response.status === 200 && response.data) {
      const movies = response.data.results;
      dispatch(setMovies(movies)); // Dispatch action with only movie results
    } else {
      console.error("Error fetching data:", response.statusText); // More specific error message
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
