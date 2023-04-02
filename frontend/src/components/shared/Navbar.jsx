import { Link } from 'react-router-dom';
import useToken from '../../hooks/useToken';

function Navbar({ isLoggedIn }) {

    const {token, removeToken} = useToken()


  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
    <div className="container">
        <Link to='/' className="navbar-brand">CodeNext</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                {/* Dynamically insert links here based on auth */}
            </div>
        </div>
    </div>
</nav>
  );
}

export default Navbar;
