import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button } from '@mui/material';


function AdminHome() {
  return (
    <div >
      {/* <FlightForm /> */}
      <Navbar />
      <Grid container spacing={0}>         

        <Grid item xs={9} > 
        <Dashboard />
        <Button href="/createFlight" >Create new Flight</Button>
        </Grid>
        <Grid item xs={3}  height="100%">
          <SearchFlights/>
        </Grid>
        
      </Grid>
    </div>
  );


}

export default AdminHome;
