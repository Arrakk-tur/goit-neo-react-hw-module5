import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieCredits } from "../../api/Api";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieCredits = async () => {
      setLoading(true);
      try {
        const credits = await fetchMovieCredits(movieId);
        setCast(credits);
      } catch (error) {
        if (error.message === "NotFound") {
          navigate("/404");
        } else {
          console.error("Error fetching movie credits:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getMovieCredits();
  }, [movieId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                : `https://placehold.co/200x300?text=${actor.name}`
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
