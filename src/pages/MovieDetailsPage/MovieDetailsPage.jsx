import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import {
  useParams,
  Link,
  useLocation,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api/Api";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const locationRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        if (error.message === "NotFound") {
          navigate("/404");
        } else {
          console.error("Error fetching movie details:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId, navigate]);

  const handleGoBack = () => {
    navigate(locationRef.current.from);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={css.container}>
      <button onClick={handleGoBack}>Go back</button>
      <div className={css.movieDetails}>
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <ul className={css.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading cast/reviews...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
