import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button, FormLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import PersistentDrawerRight from './PersistentDrawerRight';
import Ticket from './Ticket_components/Ticket';
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


//This is a prototype page just to test ticket display, most functionalities are not implemented yet --youssef


function Itinerary() {
  const [open, setOpen] = useState(false);
  const [theJsons, updateTheJsons] = useState([]);
  const [theJsons2, updateTheJsons2] = useState([]);
  const [thersv, setTheRsv] = useState('');
  const [width,setWidth]=useState("0");
  const [marginLeft,setMarginLeft]=useState("0");
  const [paddingLeft,setPaddingLeft] = useState("100px");
  const [paddingRight,setPaddingRight] = useState("100px");
  var theflightdisplay;
  
  useEffect(() => {
    let isCancelled = false;

    axios.get("http://localhost:8000/api/flights/user/61aa4dadbde7d1780db3dda5")
        .then(res =>{
            for(var i = 0; i < res.data.length; i++){
                axios.get("http://localhost:8000/api/users/itinerary/61aa4dadbde7d1780db3dda5/"+res.data[i]._id)
                    .then(res => {
                        if(!isCancelled)
                        while(theJsons.length != 0){
                            theJsons.pop();
                        }
                          
                        theJsons.push(res.data.departure_seats.map((sf) => {
                            
                            return{
                            
                            _id: sf._id,
                            flight_id: sf.flight_id,
                            reservation_id:sf.reservation_id,
                            seat_type: sf.seat_type,
                            seat_name: sf.seat_name,
                            total_price: res.data.total_price,
                            amount_paid: res.data.amount_paid,
                            reservation_number: res.data.reservation_number,
                            flight_details: [{
                                flight_number: res.data.departure_flight.flight_number,
                                from: res.data.departure_flight.from,
                                departure_terminal: res.data.departure_flight.departure_terminal,
                                to: res.data.departure_flight.to,
                                arrival_terminal: res.data.departure_flight.arrival_terminal,
                                economy_seats: res.data.departure_flight.economy_seats,
                                business_seats: res.data.departure_flight.business_seats,
                                first_seats: res.data.departure_flight.first_seats,
                                departure_time: res.data.departure_flight.departure_time,
                                arrival_time: res.data.departure_flight.arrival_time,
                                
                            }]
                            
                        }}));
                        updateTheJsons(theJsons);

                        while(theJsons2.length != 0){
                            theJsons2.pop();
                        }

                        theJsons2.push(res.data.return_seats.map((sf) => {
                            return{
                            
                            _id: sf._id,
                            flight_id: sf.flight_id,
                            reservation_id:sf.reservation_id,
                            seat_type: sf.seat_type,
                            seat_name: sf.seat_name,
                            flight_details: [{
                                flight_number: res.data.return_flight.flight_number,
                                from: res.data.return_flight.from,
                                departure_terminal: res.data.return_flight.departure_terminal,
                                to: res.data.return_flight.to,
                                arrival_terminal: res.data.return_flight.arrival_terminal,
                                economy_seats: res.data.return_flight.economy_seats,
                                business_seats: res.data.return_flight.business_seats,
                                first_seats: res.data.return_flight.first_seats,
                                departure_time: res.data.return_flight.departure_time,
                                arrival_time: res.data.return_flight.arrival_time,
                            }]
                            
                        }}));
                        updateTheJsons(theJsons2);
                    });
            }
        });

    


      return () => {isCancelled = true;}


  }, []);

  console.log(theJsons);

  function handleClose(){
    setOpen(false);
  }

  function openCancellation(rsvid){
      setOpen(true);
      setTheRsv(rsvid);
  }

  function handleCancellation(){
        axios.delete("http://localhost:8000/api/users/reservation/61aa4dadbde7d1780db3dda5/"+thersv);
        handleClose();
  }
  

  
  return (
    <div >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div>
        <div id="main" style={{marginLeft:marginLeft,paddingLeft:paddingLeft,paddingRight:paddingRight}}>
        {theJsons.map((thing,index)=>{
            return(<Accordion key={index}>
                <AccordionSummary
                  
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                  
                >
                  <FormControlLabel
                    
                    aria-label="Acknowledge"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    label={' '+(theJsons[0]==undefined?'':(theJsons[0][0]==undefined?'':theJsons[0][0].flight_details[0].from)+" ✈ "
                    +(theJsons[0][0]==undefined?'':theJsons[0][0].flight_details[0].to))}
                    control={<Button key="buttonkey" variant="outlined" onClick={()=>openCancellation(theJsons[0][0]==undefined?'':theJsons[0][0].reservation_id)} style={{marginRight: 20, textAlign: 'right', color: 'red'}} >Cancel reservation</Button>}
                  />
                
                {/*<Box sx={{ flexGrow: 1 }}><label style={{marginLeft: 300}}>{"Price: "+(theJsons[0][0].total_price.$numberDecimal)}</label></Box>
                <Box sx={{ flexGrow: 1 }}><label style={{marginLeft: 10}}>{"Paid: "+theJsons[0][0].amount_paid.$numberDecimal}</label></Box>
      <Box sx={{ flexGrow: 1 }}><label style={{marginLeft: 10}}>{"Number: "+theJsons[0][0].reservation_number}</label></Box>*/}
    
                </AccordionSummary>
                <AccordionDetails>
                    
                    <div>
                        <h2>Departure Tickets:</h2>
                        {theJsons[0]==undefined?[]:theJsons[0].map((js,inddex) => {
                            return <Ticket key={inddex+"A"} getRows= {js==undefined?[]:[js]}/>
                        })}
                        <h2>Return Tickets:</h2>
                        {theJsons2[0]==undefined?[]:theJsons2[0].map((js,inddex) => {
                            return <Ticket key={inddex+"B"} getRows= {js==undefined?[]:[js]}/>
                        })}
                    </div>
                    
                </AccordionDetails>
              </Accordion>)
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
                    <Button variant="contained" onClick={handleCancellation} autoFocus>
                        Cancel Reservation
                    </Button>
                    <Button variant="outlined" onClick={handleClose} >Do Not Cancel Reservation</Button>
                </DialogActions>
            </Dialog>
      
    </div>
  );


}

export default Itinerary;
