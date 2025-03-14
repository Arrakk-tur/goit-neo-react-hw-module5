import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/Api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: searchQuery });
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
      {loading ? <div>Loading...</div> : <MovieList movies={searchResults} />}
    </div>
  );
}

export default MoviesPage;
