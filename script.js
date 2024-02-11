import * as helpers from './helpers.js';

//Saving API key from TMDB API
const tmdbKey = 'a995f12d420a59b5ff6e47ee8cdabab9';
const tmdbBaseUrl = 'https://api.themoviedb.org/3'; //Base Url for all API cals
const playBtn = document.getElementById('playBtn');

require('dotenv').config();

console.log(process.env);

//API call for genres
const getGenres = async () => {
 const genreRequestEndpoint = '/genre/movie/list'; // API endpoint
 const requestParams = `?api_key=${tmdbKey}`; //Query string, to attach API key
 const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`; //Generating full address
 try {
  const response = await fetch(urlToFetch);
  if (response.ok) { //Check if response is TRUEty
    const jsonResponse = await response.json(); //Converting response object to JSON object
    console.log(jsonResponse);
    const genres = jsonResponse.genres; //Saving genres property of jsonResponse to var: genres
    return genres;
  }
 } catch (error) { //Catch error
  console.log(error); //Log error
 }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&${selectedGenre}`; //
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      console.log(jsonResponse);
      console.log(movies);
      return movies;
    }
  }
  catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  }
  catch (error) {
    console.log(error);
  }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};


getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
