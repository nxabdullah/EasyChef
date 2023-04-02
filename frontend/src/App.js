import { useState } from 'react'

// import router
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// import authentication
import useToken from './hooks/useToken';

// import pages and components
import Navbar from "./components/shared/Navbar";
import Landing from "./pages/Landing";
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const {token, removeToken} = useToken()
  const [isAuth, setIsAuth] = useState(!!token);

  const logout = () => {
    setIsAuth(false);
    removeToken();
  }

  return (
    <Router>
      <header>
        <Navbar logout={logout} isAuth={isAuth} />
      </header>

      {/* Route to the correct page as needed */}
      <div className='container mb-4'>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
