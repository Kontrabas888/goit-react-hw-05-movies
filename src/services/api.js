import axios from "axios";

const API_KEY = "74452ff48fb840cab50125a8e2dfcb31";

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const searchMovies = async (searchTerm) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
  );
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
const response = await axios.get(
`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
);
return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};

const getMovieCredits = (movieId) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
}

export default getMovieCredits;

export const getMovies = async (searchTerm) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
  );
  return response.data.results;
};


