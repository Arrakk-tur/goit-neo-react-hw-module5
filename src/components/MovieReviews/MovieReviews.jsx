import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieReviews } from "../../api/Api";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieReviews = async () => {
      setLoading(true);
      try {
        const fetchedReviews = await fetchMovieReviews(movieId);
        setReviews(fetchedReviews);
      } catch (error) {
        if (error.message === "NotFound") {
          navigate("/404");
        } else {
          console.error("Error fetching movie reviews:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
