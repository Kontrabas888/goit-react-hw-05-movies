import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/api.js";
import "../styles/movies.css";

const Movies = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();


  const handleInputChange = (event) => {
    const searchText = event.target.value;
    setSearch(searchText);
    localStorage.setItem("searchText", searchText);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      const movies = await searchMovies(search);
      setMovies(movies);
      searchParams.set("query", search);
      navigate(`?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchText");
    if (savedSearch) {
      setSearch(savedSearch);
      searchMovies(savedSearch).then((movies) => {
        setMovies(movies);
      });
    } else if (searchParams.has("query")) {
      setSearch(searchParams.get("query"));
      searchMovies(searchParams.get("query")).then((movies) => {
        setMovies(movies);
      });
    }
  }, [searchParams]);

  return (
    <div className="search-input">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={handleInputChange}
        />
        <button className="movies-button " type="submit">
          Search
        </button>
      </form>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3 className="link-movies">
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>

          </h3>
        </div>
      ))}
    </div>
  );
};

export default Movies;
