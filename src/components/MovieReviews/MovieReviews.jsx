import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/Api";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      const fetchedReviews = await fetchMovieReviews(movieId);
      setReviews(fetchedReviews);
    };

    getMovieReviews();
  }, [movieId]);

  if (!reviews || reviews.length === 0) {
    return <div>We don't have any reviews for this movie.</div>;
  }

  return (
    <ul className={css.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewItem}>
          <h4 className={css.author}>Author: {review.author}</h4>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
