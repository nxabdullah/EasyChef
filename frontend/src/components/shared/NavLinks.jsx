import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";

function NavLinks({ logout, isAuth, account }) {
  // constraint: if first name exists, then so should last name.
  const getProfilePictureLabel = (account) => {
    if (account) {
      if (account.first_name && account.last_name) {
        return (
          account.first_name[0].toUpperCase() +
          account.last_name[0].toUpperCase()
        );
      } else {
        return account.username[0];
      }
    }
    return "A";
  };

  if (!isAuth && account === null) {
    return (
      <>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item nav-primary">
            <NavLink to={"/"} className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item nav-primary">
            <NavLink to={"/login"} className="nav-link">
              Login
            </NavLink>
          </li>
          <li className="nav-item nav-primary">
            <NavLink to={"/register"} className="nav-link">
              Register
            </NavLink>
          </li>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <ul class="navbar-nav ms-auto">
          <li className="nav-item nav-primary">
            <NavLink to={"/"} className="nav-link">
              Home
            </NavLink>
          </li>
          <li class="nav-item nav-primary">
            <NavLink to={"/account/recipes"} className="nav-link">
              My Recipes
            </NavLink>
          </li>

          <li class="nav-item nav-primary">
            <NavLink to={"/shopping"} className="nav-link">
              Shopping List
            </NavLink>
          </li>

          <li class="nav-item dropdown">
            <div
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              My Profile
            </div>
            <ul class="dropdown-menu custom" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/profile" class="text-decoration-none">
                  <div id="nav-user-section">
                    <Avatar
                      label={getProfilePictureLabel(account)}
                      size="large"
                      shape="circle"
                      id="profile-pic"
                      image={account && account.profile_picture}
                    />

                    <span className="mt-1">{account && account.username}</span>
                  </div>
                </Link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <Link to="/profile" class="dropdown-item">
                  <i class="fa-regular fa-user inline-icon"></i>
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  class="dropdown-item"
                  onClick={() => logout()}
                >
                  <i class="fa-solid fa-power-off inline-icon"></i>
                  Log out
                </Link>
              </li>
            </ul>
          </li>

          <li class="nav-item nav-primary">
            <Link to="/recipes/create" class="nav-link p-0">
              <button id="create-button">
                <span class="fa-solid fa-plus"></span>
                <span>Add Recipe</span>
              </button>
            </Link>
          </li>
        </ul>
      </>
    );
  }
}

export default NavLinks;
