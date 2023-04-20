import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/movies/:movieId">MovieDetails</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default Layout;