import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="login-nav">
      <div className="container">
        <Link to="/" className="navbar-brand" id="logo-nav">
          EasyChef
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
