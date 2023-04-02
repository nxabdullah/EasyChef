// import router
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

// import pages and components
import Landing from "./pages/Landing";
import Navbar from "./components/shared/Navbar";
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>

      {/* Route to the correct page as needed */}
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
