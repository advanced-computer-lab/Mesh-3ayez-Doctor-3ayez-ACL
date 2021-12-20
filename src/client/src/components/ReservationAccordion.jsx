import { Button, FormLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './Ticket_components/Ticket';
import Box from '@mui/material/Box';
import {Accordion} from '@material-ui/core';
import {AccordionSummary} from '@material-ui/core';
import {AccordionDetails} from '@material-ui/core';
import {FormControlLabel} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Redirect, useHistory } from 'react-router';
import UserNavBar from './UserNavBar';
import { withStyles } from '@material-ui/core';

function ReservationAccordion(probs){

    const [thereservation, updateReservation] = useState(probs.reservation);
    const [isLoading, setLoading] = useState(true);
    const [theJsons, updateTheJsons] = useState([]);
    const [theJsons2, updateTheJsons2] = useState([]);

    useEffect(() => {
        if(isLoading){
        axios.get("http://localhost:8000/api/users/itinerary/61bcd1e7bf1ace92644c0287/"+thereservation._id.toString()).then(
            res => {
                
                updateTheJsons(res.data.departure_seats.map((sf) => {
                    
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

                updateTheJsons2(res.data.return_seats.map((sf) => {
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
                setLoading(false);
            }

            

        ).catch(err => {
            console.log(err);
        })
    }
    })

    
if(theJsons[0]!=undefined)
    return(
        <Accordion> 
                <AccordionSummary
                  
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                  
                >
                  <FormControlLabel
                    
                    aria-label="Acknowledge"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    label={' '+(theJsons[0]==undefined?'':theJsons[0].flight_details[0].from+" ✈ "
    +(theJsons[0]==undefined?'':theJsons[0].flight_details[0].to))}
    control={<Button key="buttonkey" variant="outlined" onClick={()=>probs.delete_callback(theJsons[0]==undefined?'':theJsons[0].reservation_id)} style={{marginRight: 20, textAlign: 'right', color: 'red'}} >Cancel reservation</Button>}
                  />
                
                <Box sx={{ flexGrow: 1 }}><label style={{marginLeft: 300}}>{"Price: "+(theJsons[0]==undefined?'':theJsons[0].total_price.$numberDecimal)}</label></Box>
                <Box sx={{ flexGrow: 1 }}><label style={{marginLeft: 10}}>{"Paid: "+(theJsons[0]==undefined?'':theJsons[0].amount_paid.$numberDecimal)}</label></Box>
      <Box sx={{ flexGrow: 1 }}><label style={{marginLeft: 10}}>{"Number: "+(theJsons[0]==undefined?'':theJsons[0].reservation_number)}</label></Box>
    
                </AccordionSummary>
                <AccordionDetails>
                    
                    <div>
                        <h2>Departure Tickets:</h2>
                        {theJsons==undefined?[]:theJsons.map((js,inddex) => {
                            return <Ticket key={inddex+"A"} getRows= {js==undefined?[]:[js]}/>
                        })}
                        <h2>Return Tickets:</h2>
                        {theJsons2==undefined?[]:theJsons2.map((js,inddex) => {
                            return <Ticket key={inddex+"B"} getRows= {js==undefined?[]:[js]}/>
                        })}
                    </div>
                    
                </AccordionDetails>
              </Accordion>
    )
else
    return null;
}

export default withStyles()(ReservationAccordion);