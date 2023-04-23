import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../services/api";
import "../styles/home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="home-text">Trending today:</h2>
      <ul className="home-pages">
        {movies.map((movie) => (
          <li className="home-item" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
