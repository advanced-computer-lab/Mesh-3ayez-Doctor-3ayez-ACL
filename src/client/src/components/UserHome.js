import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import PersistentDrawerRight from './PersistentDrawerRight';
import Ticket from './Ticket_components/Ticket';
import FlightDisplay from './Ticket_components/FlightDisplay';

//This is a prototype page just to test ticket display, most functionalities are not implemented yet --youssef


function UserHome() {
  const [rows, updateRows] = useState([]);
  const [width,setWidth]=useState("0");
  const [marginLeft,setMarginLeft]=useState("0");
  const [paddingLeft,setPaddingLeft] = useState("100px");
  const [paddingRight,setPaddingRight] = useState("100px");
  var theflightdisplay;
  
  useEffect(() => {
    let isCancelled = false;

    axios.get("http://localhost:8000/api/flights/61aa2bf03c1776af5683b9b2/61aa2bf03c1776af5683b9b5")
      .then(res => {
        if(!isCancelled)
          updateRows(res.data);
        //   console.log(res.data);
        //console.log('data retrieved');
        
      });

      return () => {isCancelled = true;}

  }, []);

  //console.log('data');
  

  
  return (
    <div >
      {/* <FlightForm /> */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div>
        <div id="main" style={{marginLeft:marginLeft,paddingLeft:paddingLeft,paddingRight:paddingRight}}>
          <Ticket getRows={rows} />
          {console.log(rows)}
          <FlightDisplay getRows={rows[0].flight_details}/>
        </div>
    </div>
      
    </div>
  );


}

export default UserHome;
