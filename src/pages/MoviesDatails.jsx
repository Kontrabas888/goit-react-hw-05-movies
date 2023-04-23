import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { Cast } from "../components/Cast";
import { Reviews } from "../components/Reviews";
import { getMovieDetails } from "../services/api";
import "../styles/moviesDatails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getMovieDetails(movieId)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  const handleBackButtonClick = () => {
    if (location.state && location.state.fromMovies) {
      navigate('/movies');
    } else {
      navigate('/');
    }
  }

  return (
    <div>
      {movie ? (
        <>
          <h2 className="details-title">{movie.title}</h2>
          <div className="details-description">
            <p>User score: {movie.vote_average}</p>
            <p className="details-overview">Overview</p>
            <p className="details-text">{movie.overview}</p>
            <p>
              Genres:{" "}
              {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>

          <div>
            <button className="back" onClick={handleBackButtonClick}>Go Back</button>
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
