import React, { useState } from "react";
import { searchMovies } from "../../api/Api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }
    const results = await searchMovies(searchQuery);
    setSearchResults(results);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className={css.input}
          placeholder="Search movies"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
}

export default MoviesPage;
