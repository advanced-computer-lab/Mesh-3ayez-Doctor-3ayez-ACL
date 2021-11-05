import './App.css';
import FlightForm from './components/FlightForm';
import SearchFlights from './components/SearchFlights';
function App() {
  return (
    <div className="App">
      <SearchFlights />
       <FlightForm /> 
    </div>
  );
}

export default App;
