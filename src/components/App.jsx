import Home from "pages/Home";
import Movies from "pages/Movies";
import MovieDetails from "pages/MoviesDatails";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { Reviews } from "./Reviews";
import { Cast } from "./Cast";

export const App = () => {
  return (  
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast movieId="{movieId}" />} />
          <Route path="reviews" element={<Reviews movieId="{movieId}" />} />
        </Route>
      </Route>
    </Routes>
  );
};
