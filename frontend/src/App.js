// import router
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// import pages and components
import Navbar from "./components/shared/Navbar";
import Landing from "./pages/Landing";
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>

      {/* Route to the correct page as needed */}
      <div className='container mb-4'>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/editprofile' element={<EditProfile />} />

        </Routes>
      </div>

    </Router>
  );
}

export default App;
