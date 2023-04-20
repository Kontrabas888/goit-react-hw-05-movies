import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { Cast } from "components/Cast";
import { Reviews } from "components/Reviews";
import "../pages/moviesDatails.css"

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=74452ff48fb840cab50125a8e2dfcb31`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {movie ? (
        <>
          <h2 className="details-title">{movie.title}</h2>
          <div className="details-description">
              <p>User score: {movie.vote_average}</p>
              <p className="details-overview">Overview</p>
              <p className="details-text">{movie.overview}</p>
              <p>Genres: {movie.genres && movie.genres.map(genre => genre.name).join(', ')}</p>
          </div>
          
          <div>
            <Link to="/movies" onClick={handleBackClick}>
              Back to movies
            </Link>
          </div>

          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
          />
          <p>Additional information</p>

          <nav>
            <ul>
              <li>
                <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="cast" element={<Cast movieId={movieId} />} />
            <Route path="reviews" element={<Reviews movieId={movieId} />} />
          </Routes>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
