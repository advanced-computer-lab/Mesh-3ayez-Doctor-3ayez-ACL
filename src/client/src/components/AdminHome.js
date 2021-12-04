import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import PersistentDrawerRight from './PersistentDrawerRight';


function AdminHome() {
  const colors= require("../colors");
  const [rows, updateRows] = useState([]);
  const [width,setWidth]=useState("0");
  const [marginLeft,setMarginLeft]=useState("0");
  const [paddingLeft,setPaddingLeft] = useState("3px");
  const [paddingRight,setPaddingRight] = useState("3px");
  useEffect(() => {
    axios.get("http://localhost:8000/api/flights/")
      .then(res => {

        updateRows(res.data);
        //   console.log(res.data);
        console.log('data retrieved');
      });


  }, []);

  function openNav() {
    setMarginLeft("250px");
    setWidth("250px");
    setPaddingLeft("8px");
    setPaddingRight("3px");

}

function closeNav() {
  setMarginLeft("0");
  setWidth("0");
  setPaddingLeft("3px");
  setPaddingRight("3px");
}
  return (
    <div >
      {/* <FlightForm /> */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div>
        <div id="mySidenav" className="sidenav" style={{width:width}}>
            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
            <Grid height="100%">
          <SearchFlights setRows={updateRows} />
        </Grid>
        </div>
        <div id="main" style={{marginLeft:marginLeft,paddingLeft:paddingLeft,paddingRight:paddingRight}}>
            <Navbar openCallBack={openNav}/>
          <Dashboard getRows={rows} />
        </div>
    </div>
      
    </div>
  );


}

export default AdminHome;
