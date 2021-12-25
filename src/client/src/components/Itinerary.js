import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button, FormLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import Ticket from './Ticket_components/Ticket';
import ReservationAccordion from './ReservationAccordion';
import FlightDisplay from './Ticket_components/FlightDisplay';
import Box from '@mui/material/Box';
import {Accordion} from '@material-ui/core';
import {AccordionSummary} from '@material-ui/core';
import {AccordionDetails} from '@material-ui/core';
import {Checkbox} from '@material-ui/core';
import {FormControlLabel} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { textAlign } from '@mui/system';
import { unstable_getScrollbarSize } from '@mui/utils';
import { Redirect, useHistory } from 'react-router';
import UserNavBar from './UserNavBar';
import { withStyles } from '@material-ui/core';
import Payment from './Payment';
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import loader from './images/Ajux_loader.gif'

const colors= require("../colors")



function Itinerary() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rsvids, setrsvids] = useState([]);
  const [thersv, setTheRsv] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [width,setWidth]=useState("0");
  const [marginLeft,setMarginLeft]=useState("0");
  const [paddingLeft,setPaddingLeft] = useState("100px");
  const [paddingRight,setPaddingRight] = useState("100px");
  const[useless,setUseless] = useState(0);
  var theflightdisplay;
  
  useEffect(() => {
    localStorage.getItem("activeStep") && localStorage.removeItem("activeStep");
    localStorage.getItem("departureReserved") && localStorage.removeItem("departureReserved");
    var tinyjsons = []
    var tinyjsons2 = []
    
    if(isLoading){
        var user_id = localStorage.getItem('user_id')
      user_id = user_id.substring(1, user_id.length-1);
    axios.get(`http://localhost:8000/api/flights/user/${user_id}`, {headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}}
    )//61bcd1e7bf1ace92644c0287")
        .then(res =>{
            for(var i=0;i<res.data.length;i++){
                if(res.data[i] == undefined){
                    res.data.splice(i,1);
                }
            }
            setrsvids(res.data);
            setLoading(false);
        }).catch(err => {
            console.log(user_id);
            console.log("hi");
            console.log(err);
        });
        
    }

    


      


  }, []);

  let history = useHistory();
  

  function handleClose(){
    setOpen(false);
  }

  function handleClose2(){
    setOpen2(false);
  }

  function openCancellation(rsvid){
      setOpen(true);
      setTheRsv(rsvid);
  }

  function openPayment(rsvid){
        setOpen2(true);
  }

  function handleCancellation(){
      var user_id = localStorage.getItem('user_id')
      user_id = user_id.substring(1, user_id.length-1);
      console.log(localStorage.getItem('token'));
        axios.delete(`http://localhost:8000/api/users/reservation/${user_id}/`+thersv, {headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}}).then(data=>{
            console.log(data);
            if(rsvids.length==1){
                setrsvids([]);
            }
        }).catch(err=>{
            console.log(err);
        });
        
        handleClose();
        history.go();
  }

  function showMessage(){
      setErrorMsg("Email sent!");
      setOpen2(true);
  }
  

  
  return (
    <div >
     <UserNavBar ></UserNavBar>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div>
        <div id="main" style={{marginLeft:marginLeft,paddingLeft:paddingLeft,paddingRight:paddingRight}}>
        <br/>
        {isLoading?<img src={loader} alt="loading..." />:rsvids.length==0&&!isLoading?<label>You do not have any reserved flights now</label>:rsvids.map((thing,index)=>{
            
            return(thing==undefined?null:<ReservationAccordion
                    key = {index+"PP"}
                    reservation = {thing}
                    delete_callback = {openCancellation}
                    message_callback = {showMessage}
                />
                )
        })}
        
        
        
        
    
        
            
      
        </div>
    </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" >
                    {"Are you sure you want to cancel your reservation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirm to cancel your reservation for both departure and return flights.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                            borderRadius: 5,
                            backgroundColor: colors.c1,
                            marginTop: "25px",
                        }}
                        variant="contained" onClick={handleCancellation} autoFocus>
                        Cancel Reservation
                    </Button>
                    <Button style={{
                            borderRadius: 5,
                            color: colors.c1,
                            marginTop: "25px",
                        }}
                        variant="outlined" onClick={handleClose} >Do Not Cancel Reservation</Button>
                </DialogActions>
            </Dialog>

            
            <Stack width="100%">
                    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                            {errorMsg}
                        </Alert>
                    </Snackbar>
            </Stack>
                
      
    </div>
  );


}

export default withStyles()(Itinerary);