import React, { useState, useEffect } from "react";
import getMovieCredits from "../services/api";

export const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId)
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  const getImageUrl = (path) => {
    return `https://image.tmdb.org/t/p/w200${path}`;
  };

  return (
    <div>
      <h3>Cast:</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img src={getImageUrl(actor.profile_path)} alt={actor.name} />
            <div className="block-actor">
              <span className="actor-name" >{actor.name}</span>
              <span className="actor-character">{actor.character}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
