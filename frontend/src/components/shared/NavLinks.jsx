// import React from 'react'
// import { Link } from "react-router-dom";
// import useToken from "../../hooks/useToken"


// function NavLinks() {

//     const {token, removeToken} = useToken()


//     if (!token) {
//         return (
//             <>
//             <ul class="navbar-nav ms-auto">
//               <li class="nav-item nav-primary">
//                 <Link to={'/'} class="nav-link">Home</Link>
//               </li>

//               <li class="nav-item nav-primary">
//                 <Link to={'/login'} class="nav-link">Login</Link>
//               </li>

//               <li class="nav-item nav-primary">
//                 <Link to={'/register'} class="nav-link">Register</Link>
//               </li>
//               {/* This needs to be in when logged in -> else part */}
//               <li class="nav-item nav-primary">
//                 <Link to={'/editprofile'} class="nav-link">My Profile</Link>
//               </li>

//             </ul>
//             </>
//         )
//     } else {
//         return (
//             <>
//             <ul class="navbar-nav ms-auto">
//               <li class="nav-item nav-primary">
//                 <Link to={'/'} class="nav-link">Home</Link>
//               </li>
//             </ul>
//             </>
//         )
//     }

// }

// export default NavLinks

import React from 'react'
import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'



function NavLinks() {

  const {token, removeToken} = useToken()

  if (!token) {
      return (
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

              {/* Remove the My profile from here */}
              <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Profile
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link to={'/editprofile'} className="dropdown-item"><FontAwesomeIcon icon={faUser} className="me-2" />Edit Profile</Link></li>
                        <li><Link to={'/logout'} className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Logout</Link></li>
                    </ul>
                </li>
          </ul>
      )
  } else {
      return (
          <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-primary">
                  <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Profile
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link to={'/editprofile'} className="dropdown-item"><FontAwesomeIcon icon={faUser} className="me-2" />Edit Profile</Link></li>
                        <li><Link to={'/logout'} className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Logout</Link></li>
                    </ul>
                </li>
          </ul>
      )
  }
}


export default NavLinks

