import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/movies.css"

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=74452ff48fb840cab50125a8e2dfcb31&query=${searchTerm}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      window.history.pushState({}, "", `/movies/${searchTerm}`);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button className="movies-button" onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link to={{pathname: `/movies/${movie.id}`, search: `?search=${searchTerm}`}}>
                <h3 className="movies-text">{movie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
