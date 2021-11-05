import './App.css';
import FlightForm from './components/FlightForm';
import Dashboard from './components/Dashboard_components/Dashboard';
import SearchFlights from './components/SearchFlights';
function App() {
  return (
    <div className="App">
       <Dashboard />
      <SearchFlights />
       <FlightForm /> 
       
    </div>
  );
}

export default App;
