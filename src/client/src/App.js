import './App.css';
import FlightForm from './components/FlightForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Routes } from 'react-router';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import UserProfile from './components/UserProfile';
import vanta from './components/vanta';


function App() {
  return (
    <Router>
      
      <Route exact path="/" component={UserProfile} />
  {/* <Route path="/createFlight" component={FlightForm} /> */}

    </Router>
  );


}

export default App;
