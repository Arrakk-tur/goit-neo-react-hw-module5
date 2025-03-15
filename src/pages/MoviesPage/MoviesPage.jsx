import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/Api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setSearchResults(results);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchParams]);

  const handleInputChange = (event) => {
    if (!event.target.value) return setSearchParams({});
    setSearchParams({ query: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className={css.input}
          placeholder="Search movies"
        />
        <button type="submit" className={css.button} disabled>
          Search
        </button>
      </form>
      {loading ? <div>Loading...</div> : <MovieList movies={searchResults} />}
    </div>
  );
}

export default MoviesPage;
