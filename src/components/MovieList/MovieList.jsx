import React from "react";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} className={css.link}>
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
