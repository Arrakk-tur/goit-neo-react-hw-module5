import React, { useState, useEffect, Suspense, lazy } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || "/movies");
  };

  if (!movie) {
    return <div>Loading...</div>;
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
            <Link to={`/movies/${movieId}/cast`} state={{ from: location }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: location }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={`/movies/:movieId/cast`} element={<MovieCast />} />
          <Route path={`/movies/:movieId/reviews`} element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
