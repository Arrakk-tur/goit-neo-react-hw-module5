import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../api/Api";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCredits = async () => {
      const credits = await fetchMovieCredits(movieId);
      setCast(credits);
    };

    getMovieCredits();
  }, [movieId]);

  if (!cast || cast.length === 0) {
    return <div>No cast information available.</div>;
  }

  return (
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.castItem}>
          <img
            src={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                : "https://via.placeholder.com/200x300"
            }
            alt={actor.name}
            className={css.actorImage}
          />
          <p className={css.actorName}>{actor.name}</p>
          <p className={css.characterName}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
