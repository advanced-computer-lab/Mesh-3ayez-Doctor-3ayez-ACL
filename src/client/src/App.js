import './App.css';
import FlightForm from './components/FlightForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Routes } from 'react-router';
import AdminHome from './components/AdminHome';
function App() {
  return (
    <Router>
      
      <Route exact path="/" component={AdminHome} />
      <Route path="/createFlight" component={FlightForm} />

    </Router>
  );


}

export default App;
