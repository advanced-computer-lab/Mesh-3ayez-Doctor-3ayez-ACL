import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FlightDisplayBody(probs) {
    
  const id = probs.id;
  const [row,setRow] = useState({
    id: probs.id,
    flight_number: probs.flight_number,
    from: probs.from,
    departure_terminal:probs.departure_terminal,
    to: probs.to,
    arrival_terminal:probs.arrival_terminal,
    departure_time: probs.departure_time,
    arrival_time: probs.arrival_time,
    seat_type: probs.seat_type,
    price: probs.seat_type == 'economy'?probs.economy_seats.price.$numberDecimal:(
        probs.seat_type == 'first'?probs.first_seats.price.$numberDecimal:
        probs.business_seats.price.$numberDecimal),
    baggage_allowance: probs.seat_type == 'economy'?probs.economy_seats.baggage_allowance.$numberDecimal:(
        probs.seat_type == 'first'?probs.first_seats.baggage_allowance.$numberDecimal:
        probs.business_seats.baggage_allowance.$numberDecimal)


  });
  const [flight_no, setFlightNo] = useState(row.flight_number);
  const [from, setFrom] = useState(row.from);
  const [arrivalTerminal,setAt]=useState(row.arrival_terminal);
  const [to, setTo] = useState(row.to);
  const [departureTerminal,setDt]=useState(row.departure_terminal);
  const [arrival_time, setArrivalTime] = useState(row.arrival_time);
  const [departure_time, setDepartureTime] = useState(row.departure_time);
  const [price, setPrice] = useState(row.price);
  const [baggage_allowance, setBaggageAllowance] = useState(row.baggage_allowance);
  const [open2, setOpen2] = useState(false);
                                         


  




  





  return (
    <tr id={id}>
      <td>{flight_no}</td>
      <td>{from}</td>
      <td>{departureTerminal}</td>
      <td>{to}</td>
      <td>{arrivalTerminal}</td>
      <td>{departure_time}</td>
      <td>{arrival_time}</td>
      <td>{price}</td>
      <td>{baggage_allowance}</td>
     
    </tr>
  )
}


export default FlightDisplayBody;