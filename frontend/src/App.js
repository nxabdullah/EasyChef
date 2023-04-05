import { useState, useEffect } from 'react'

// import router
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// import axios
import axios from 'axios';

// import authentication
import useToken from './hooks/useToken';

// import pages and components
import Navbar from "./components/shared/Navbar";
import Landing from "./pages/Landing";
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

// import constants
import { ACCOUNT_ENDPOINT } from './config/constants';
import Search from './components/landing/Search';

function App() {
  const {token, removeToken} = useToken()
  const [isAuth, setIsAuth] = useState(!!token);
  const [accountInfo, setAccountInfo] = useState(null);


  const logout = () => {
    setIsAuth(false);
    removeToken();
  }

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await axios.get(ACCOUNT_ENDPOINT, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAccountInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuth) {
      fetchAccountInfo();
    }
  }, [isAuth, token]);


  return (
    <Router>
      <header>
        <Navbar logout={logout} isAuth={isAuth} account={accountInfo} />
      </header>

      {/* Route to the correct page as needed */}
      <div className='container mb-4'>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login setLogin={() => setIsAuth(true)}/>} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profile' element={<EditProfile account={accountInfo} />} />
          <Route partial path='/search' element={<Search />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
