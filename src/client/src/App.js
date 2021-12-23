import './App.css';
import FlightForm from './components/FlightForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Routes } from 'react-router';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import UserSearchResults from './components/UserSearchResults';
import UserSearch from './components/UserSearch';
import FlightCard from './components/FlightCard';
import UserProfile from './components/UserProfile';

import {SeatPick} from'./components/SeatReservation/SeatPick'
import Signup from './components/Signup';
import Login from './components/Login';
import Itinerary from './components/Itinerary';
import EditDepartureFlight from './components/EditDepartureFlight';
import EditReturnFlight from './components/EditReturnFlight';

function App() {
  return (
    <Router>
      
      <Route exact path="/" component={UserHome} />
      <Route exact path="/admin" component={AdminHome} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/admin/createFlight" component={FlightForm} />
      <Route path="/user/searchResults" component={UserSearchResults} />
      <Route path="/user/ReturnSearchResults" component={UserSearchResults} />
      <Route path="/user/Profile" component={UserProfile} />
      <Route path="/user/reservation" component={Itinerary} />
      <Route path="/user/editDepartureFlight" component={EditDepartureFlight} />
      <Route path="/user/editReturnFlight" component={EditReturnFlight} />


    </Router>
  );


}

export default App;
