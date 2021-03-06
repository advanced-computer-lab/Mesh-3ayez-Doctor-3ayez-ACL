import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const colors= require("../../colors")
function TicketBody(probs) {
  const id = probs.id;
  const [row,setRow] = useState({
    id: probs.id,
    flight_number: probs.flight_details[0].flight_number,
    from: probs.flight_details[0].from,
    departure_terminal: probs.flight_details[0].departure_terminal,
    to: probs.flight_details[0].to,
    arrival_terminal: probs.flight_details[0].arrival_terminal,
    departure_time: probs.flight_details[0].departure_time,
    arrival_time: probs.flight_details[0].arrival_time,
    seat_type: probs.seat_type,
    seat_name: probs.seat_name.toString(),
    price: parseFloat(probs.price),
    baggage_allowance: parseFloat(probs.baggage_allowance)
  });
  const [flight_number, setFlightNumber] = useState(row.flight_number);
  const [from, setFrom] = useState(row.from);
  const [departure_terminal, setDTerminal] = useState(row.departure_terminal);
  const [to, setTo] = useState(row.to);
  const [arrival_terminal, setATerminal] = useState(row.arrival_terminal);
  const [departure_time, setDTime] =useState(row.departure_time);
  const [arrival_time, setATime] =useState(row.arrival_time);
  const [seat_type, setSeatType] =useState(row.seat_type);
  const [seat_name, setSeatName] =useState(row.seat_name);
  const [price, setPrice] =useState(row.price);
  const [baggage_allowance, setBaggageAllowance] =useState(row.baggage_allowance);

 



  






 

  return (
    <tr id={id}>
      <td style={{color:colors.c1}}>{flight_number}</td>
      <td style={{color:colors.c1}}>{from}</td>
      <td style={{color:colors.c1}}>{departure_terminal}</td>
      <td style={{color:colors.c1}}>{to}</td>
      <td style={{color:colors.c1}}>{arrival_terminal}</td>
      <td style={{color:colors.c1}}>{departure_time}</td>
      <td style={{color:colors.c1}}>{parseInt((new Date(arrival_time).getTime()-new Date(departure_time).getTime())/1000/60/60)+" hours"}</td>
      <td style={{color:colors.c1}}>{arrival_time}</td>
      <td style={{color:colors.c1}}>{seat_type}</td>
      <td style={{color:colors.c1}}>{seat_name}</td>
      <td style={{color:colors.c1}}>{price}</td>
      <td style={{color:colors.c1}}>{baggage_allowance}</td>
    </tr>
  )
}


export default TicketBody;