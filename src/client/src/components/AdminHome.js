import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button } from '@mui/material';
import {useState, useEffect} from 'react';
import axios from 'axios';


function AdminHome() {
  const [rows, updateRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/flights/")
    .then(res => {

        updateRows(res.data);
        //   console.log(res.data);
        console.log('data retrieved');
    });
   

}, []);


  console.log(rows);
  return (
    <div >
      {/* <FlightForm /> */}
      <Navbar />
      <Grid container spacing={0}>         

        <Grid item xs={9} > 
        <Dashboard  getRows = {rows}/>
        <Button href="/createFlight" >Create new Flight</Button>
        </Grid>
        <Grid item xs={3}  height="100%">
          <SearchFlights setRows={updateRows}/>
        </Grid>
        
      </Grid>
    </div>
  );


}

export default AdminHome;
