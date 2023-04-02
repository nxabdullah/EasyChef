import React from 'react'
import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken"

function NavLinks() {

    const {token, removeToken} = useToken()


    if (!token) {
        return (
            <>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item nav-primary">
                <Link to={'/'} class="nav-link">Home</Link>
              </li>

              <li class="nav-item nav-primary">
                <Link to={'/login'} class="nav-link">Login</Link>
              </li>

              <li class="nav-item nav-primary">
                <Link to={'/register'} class="nav-link">Register</Link>
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
            </ul>
            </>
        )
    }

}

export default NavLinks