import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BasicAlert from "../BasicAlert";


function TableRow(probs) {
  const id = probs.id;
  const [row,setRow] = useState({
    id: probs.id,
    flight_number: probs.flight_number,
    from: probs.from,
    to: probs.to,
    economy_seats: probs.economy_seats,
    business_seats: probs.business_seats,
    first_seats: probs.first_seats,
    departure_time: probs.departure_time,
    arrival_time: probs.arrival_time
  });
  const [flight_no, setFlightNo] = useState(row.flight_number);
  const [from, setFrom] = useState(row.from);
  const [to, setTo] = useState(row.to);
  const [economySeats, setESeats] = useState(row.economy_seats)
  const [businessSeats, setBSeats] =useState(row.business_seats)
  const [firstSeats, setFSeats] = useState(row.first_seats)
  const [arrival_time, setArrivalTime] = useState(row.arrival_time);
  const [departure_time, setDepartureTime] = useState(row.departure_time);
  const [open2, setOpen2] = useState(false);

  const [ecoPrice, setEcoPrice] = useState(row.economy_seats.price.$numberDecimal);                                             
  const [ecoBaggageAllowance, setEcoBag] = useState(row.economy_seats.baggage_allowance.$numberDecimal);                            
  const [ecoMaxSeats, setEcoMax] = useState(row.economy_seats.max_seats);                                           


  const [busPrice, setBusPrice] = useState(row.business_seats.price.$numberDecimal);
  const [busBaggageAllowance, setBusBag] = useState(row.business_seats.baggage_allowance.$numberDecimal);
  const [busMaxSeats, setBusMax] = useState(row.business_seats.max_seats);


  const [firPrice, setFirPrice] = useState(row.first_seats.price.$numberDecimal);
  const [firBaggageAllowance, setFirBag] = useState(row.first_seats.baggage_allowance.$numberDecimal);
  const [firMaxSeats, setFirMax] = useState(row.first_seats.max_seats);

  
  const [alert, setAlert] = useState(false);
  const [succ, setSucc] = useState(false);
  const [msg, setMsg] = useState("");






  function handleClickOpen2 (){
    setAlert(false);
    setOpen2(true);
    setFlightNo(flight_no);
    setFrom(from);
    setTo(to);
    setArrivalTime(arrival_time);
    setDepartureTime(departure_time);
    setESeats(economySeats);
    setBSeats(businessSeats);
    setFSeats(firstSeats);
};

function handleCloseDone (){
  setAlert(false);
  setFlightNo(flight_no?flight_no:row.flight_number);
  setFrom(from?from:row.from);
  setTo(to? to: row.to);
  setArrivalTime(arrival_time? arrival_time: row.arrival_time);
  setDepartureTime(departure_time? departure_time: row.departure_time);
  setESeats(economySeats? economySeats: row.economy_seats);
  setBSeats(businessSeats? businessSeats: row.business_seats);
  setFSeats(firstSeats? firstSeats: row.first_seats);

  setOpen2(false);
};
function handleClose2 (){
  setFlightNo(row.flight_number);
  setFrom(row.from);
  setTo(row.to);
  setArrivalTime(row.arrival_time);
  setDepartureTime(row.departure_time);
  setESeats(row.economy_seats);
  setBSeats(row.business_seats);
  setFSeats(row.first_seats);
  setOpen2(false);
};

function foo2() {
  const data = {
      "flight_number": flight_no,
      "from": from,
      "to": to,
      "arrival_time": arrival_time,
      "departure_time": departure_time,
      "economy_seats": economySeats,
      "business_seats": businessSeats,
      "first_seats": firstSeats
  }
  axios.put("http://localhost:8000/api/flights/" +id, data, { "Content-Type": "application/json" })
      .then(result => {console.log(result);
        setRow(result.data[0]);
      handleCloseDone();
    }
      )
      .catch(err =>{
          setAlert(true);
          setSucc(false);
          setMsg(err.response.data.msg)
      });
}

 

  return (
    <tr id={id}>
      <td>{flight_no}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td>{economySeats}</td>
      <td>{businessSeats}</td>
      <td>{firstSeats}</td>
      <td>{departure_time}</td>
      <td>{arrival_time}</td>
      <td><button onClick={handleClickOpen2}className="btn edt"> Edit</button></td>
      <td><button onClick={()=>probs.delete_callback(id)}
      className="btn dlt">Delete</button></td>
     <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" >
                    {"Edit flight details!"}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div >
                            <TextField
                                onChange={function (e) {
                                        setFlightNo(e.target.value);
                                }}
                                value={flight_no}
                                id="outlined-number"
                                label="Flight number"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="From"
                            value={from}
                            onChange={function (e) {
                                    setFrom(e.target.value);
                            }
                            }
                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="To"
                            value={to}
                            onChange={function (e) {
                                    setTo(e.target.value);
                            }}
                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField
                            onChange={function (e) {
                                    setArrivalTime(e.target.value);
                            }

                            }
                            id="outlined-number"
                            label="Arrival Time"
                            type="datetime-local"
                            value={arrival_time}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="yyyy-mm-dd"


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField
                            onChange={function (e) {
                                if (e.target.value !== "")
                                    setDepartureTime(e.target.value);
                            }

                            }
                            id="outlined-number"
                            label="Departure time"
                            type="datetime-local"
                            value={departure_time}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="yyyy-mm-dd"

                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Economy seats"
                            type="number"
                            value={economySeats}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setESeats(e.target.value);
                            }
                            }


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Business seats"
                            type="number"
                            value={businessSeats}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setBSeats(e.target.value);
                            }
                            }

                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="First seats"
                            type="number"
                            value={firstSeats}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setFSeats(e.target.value);
                            }

                            }

                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="First Class Baggage Allowance"
                            type="number"
                            value={firBaggageAllowance}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setFirBag(e.target.value);
                            }
                            }
                        />
                        {alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => foo2()} autoFocus>
                        Done
                    </Button>
                    <Button variant="outlined" onClick={handleClose2}>Cancel</Button>
                    


                </DialogActions>
            </Dialog>
    </tr>
  )
}


export default TableRow;