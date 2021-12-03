import './App.css';
import FlightForm from './components/FlightForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Routes } from 'react-router';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import UserSearchResults from './components/UserSearchResults';
import UserSearch from './components/UserSearch';


function App() {
  return (
    <Router>
      
      <Route exact path="/" component={UserHome} />
      <Route path="/createFlight" component={FlightForm} />
      <Route path="/SearchResults" component={UserSearchResults} />

    </Router>
  );


}

export default App;
