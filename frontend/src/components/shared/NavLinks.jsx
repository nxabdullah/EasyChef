import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


function NavLinks({ logout, isAuth }) {

    if (!isAuth) {
        return (
            <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-primary">
                  <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item nav-primary">
                  <Link to={'/login'} className="nav-link">Login</Link>
              </li>
              <li className="nav-item nav-primary">
                  <Link to={'/register'} className="nav-link">Register</Link>
              </li>
          </ul>
            </>
        )
    } else {
        return (
          <>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item nav-primary">
              <Link to={'/'} class="nav-link">Home</Link>
            </li>
            <li class="nav-item nav-primary">
              <Link to={'/myrecipes'} class="nav-link">My Recipes</Link>
            </li>
             <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Profile
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link to={'/editprofile'} className="dropdown-item"><FontAwesomeIcon icon={faUser} className="me-2" />Edit Profile</Link></li>
                        <li><Link to={'/'} className="dropdown-item" onClick={() => logout()} ><FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Logout</Link></li>
                    </ul>
                </li>
          </ul>
          </>
      )

    }

}


export default NavLinks

