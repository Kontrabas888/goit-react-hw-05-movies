import React, { useState, useEffect } from "react";
import { getMovieReviews } from "../services/api";

export const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then((results) => {
        setReviews(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <div>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p>Author: {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
