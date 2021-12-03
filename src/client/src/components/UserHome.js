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

//This is a prototype page just to test ticket display, most functionalities are not implemented yet --youssef


function UserHome() {
  const [rows, updateRows] = useState([]);
  const [width,setWidth]=useState("0");
  const [marginLeft,setMarginLeft]=useState("0");
  const [paddingLeft,setPaddingLeft] = useState("100px");
  const [paddingRight,setPaddingRight] = useState("100px");
  useEffect(() => {
    axios.get("http://localhost:8000/api/flights/61a9d8d4caa402557f581ae0/61a9d8d4caa402557f581af7")
      .then(res => {

        updateRows(res.data);
        //   console.log(res.data);
        console.log('data retrieved');
      });


  }, []);

  
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
        </div>
    </div>
      
    </div>
  );


}

export default UserHome;
