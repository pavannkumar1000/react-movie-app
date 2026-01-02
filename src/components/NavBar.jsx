import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">MovieApp</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
