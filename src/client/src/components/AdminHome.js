import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';


function AdminHome() {
  const colors= require("../colors");
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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Navbar />
      <Grid container spacing={0}>

        <Grid item xs={9} >

          <Button href="/createFlight" startIcon={<Icon color="primary">add_circle</Icon>}>Create new Flight</Button>

          <Dashboard getRows={rows} />
        </Grid>
        <Grid item xs={3} height="100%">
          <SearchFlights setRows={updateRows} />
        </Grid>

      </Grid>
    </div>
  );


}

export default AdminHome;
