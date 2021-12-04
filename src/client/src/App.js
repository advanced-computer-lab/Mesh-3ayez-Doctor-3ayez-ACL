import './App.css';
import FlightForm from './components/FlightForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Routes } from 'react-router';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import UserSearchResults from './components/UserSearchResults';
import UserSearch from './components/UserSearch';
import FlightCard from './components/FlightCard';
import {SeatPick} from'./components/SeatReservation/SeatPick'

function App() {
  return (
    <Router>
      
      <Route exact path="/" component={UserHome} />
      <Route path="/admin" component={AdminHome} />
      <Route path="/admin/createFlight" component={FlightForm} />
      <Route path="/user/searchResults" component={UserSearchResults} />
      <Route path="/user/ReturnSearchResults" component={UserSearchResults} />
      <Route path="/user/seatReservation" component={SeatPick} />

    </Router>
  );


}

export default App;
