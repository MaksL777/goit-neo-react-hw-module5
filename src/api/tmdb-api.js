import axios from "axios";

// Тимчасово використовуємо токен напряму для перевірки
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  const { data } = await tmdbApi.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await tmdbApi.get(`/search/movie?query=${query}`);
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}/reviews`);
  return data.results;
};
