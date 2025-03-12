import React, { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../api/Api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
}

export default HomePage;
