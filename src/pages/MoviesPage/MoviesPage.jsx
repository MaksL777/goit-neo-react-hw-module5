import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.search.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
    form.reset();
  };

  return (
    <main className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p>Something went wrong.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
