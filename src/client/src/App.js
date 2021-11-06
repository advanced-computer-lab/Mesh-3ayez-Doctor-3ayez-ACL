import './App.css';
import Dashboard from './components/Dashboard_components/Dashboard';
import Navbar from './components/Navbar';
import FlightForm from './components/FlightForm';
import Grid from '@mui/material/Grid';
import SearchFlights from './components/SearchFlights';


function App() {
  return (
    <div className="App">
      {/* <FlightForm /> */}
      <Navbar />
      <Grid container spacing={0}>         

        <Grid item xs={9}> 
        <Dashboard />
        </Grid>
        <Grid item xs={3}>
          <SearchFlights/>
        </Grid>
      </Grid>
    </div>
  );


}

export default App;
