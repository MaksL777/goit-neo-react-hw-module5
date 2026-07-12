import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error loading movie.</div>;
  if (!movie) return null;

  const defaultImg = "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <main className={css.container}>
      <Link to={backLinkRef.current} className={css.backBtn}>
        ← Go back
      </Link>

      <div className={css.movieInfo}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.details}>
          <h1>
            {movie.title} ({movie.release_date?.split("-")[0]})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>

      <hr />

      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <hr />

      <Suspense fallback={<div>Loading additional info...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
