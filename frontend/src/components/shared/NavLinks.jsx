import React from 'react'
import { NavLink, Link } from "react-router-dom";


function NavLinks({ logout, isAuth, account }) {

    console.log(account)

    if (!isAuth) {
        return (
            <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-primary">
                  <NavLink to={'/'} className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item nav-primary">
                  <NavLink to={'/login'} className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item nav-primary">
                  <NavLink to={'/register'} className="nav-link">Register</NavLink>
              </li>
          </ul>
            </>
        )
    } else {
        return (
          <>
          <ul class="navbar-nav ms-auto">
            <li className="nav-item nav-primary">
                <NavLink to={'/'} className="nav-link">Home</NavLink>
            </li>
            <li class="nav-item nav-primary">
                <NavLink to={'/account/recipes'} className="nav-link">My Recipes</NavLink>
            </li>

            <li class="nav-item nav-primary">
                <NavLink to={'/shopping'} className="nav-link">Shopping List</NavLink>
            </li>

            <li class="nav-item dropdown">
              <div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Profile
              </div>
              <ul class="dropdown-menu custom" aria-labelledby="navbarDropdown">
                <li>
                  <Link to='/profile' class="text-decoration-none">
                    <div id="nav-user-section">
                      <img src={`${process.env.PUBLIC_URL}/profile.png`} id="profile-pic" alt='profile' />
                      <span>{account && account.username}</span>
                  </div>
                  </Link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                    <Link to='/profile' class="dropdown-item">
                     <i class="fa-regular fa-user inline-icon"></i>
                     Edit Profile
                    </Link>
                </li>
                 <li>
                   <Link to='/login' class="dropdown-item" onClick={() => logout()}>
                    <i class="fa-solid fa-power-off inline-icon"></i>
                      Log out
                    </Link>
                  </li>
              </ul>
            </li>

            <li class="nav-item nav-primary">
              <Link to='/recipes/create' class="nav-link p-0">
                <button  id="create-button">
                  <span class="fa-solid fa-plus"></span>
                  <span>Add Recipe</span>
                </button>
              </Link>
            </li>
          </ul>
          </>
      )

    }

}


export default NavLinks

