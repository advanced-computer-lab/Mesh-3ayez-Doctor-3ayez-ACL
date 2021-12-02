import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function TableRow(probs) {
    
  const id = probs.id;
  const [row,setRow] = useState({
    id: probs.id,
    flight_number: probs.flight_number,
    from: probs.from,
    departure_terminal:probs.departure_terminal,
    to: probs.to,
    arrival_terminal:probs.arrival_terminal,
    economy_seats: {max_seats:probs.eco_max_seats,available:probs.economy_seats,price:probs.eco_price,baggage_allowance:probs.eco_bag},
    business_seats:  {max_seats:probs.bus_max_seats,available:probs.business_seats,price:probs.bus_price,baggage_allowance:probs.bus_bag},
    first_seats:  {max_seats:probs.fir_max_seats,available:probs.first_seats,price:probs.fir_price,baggage_allowance:probs.fir_bag},
    departure_time: probs.departure_time,
    arrival_time: probs.arrival_time,


  });
  const [flight_no, setFlightNo] = useState(row.flight_number);
  const [from, setFrom] = useState(row.from);
  const [arrivalTerminal,setAt]=useState(row.arrival_terminal);
  const [to, setTo] = useState(row.to);
  const [departureTerminal,setDt]=useState(row.departure_terminal);
  const [economySeats, setESeats] = useState(row.economy_seats.available);
  const [businessSeats, setBSeats] =useState(row.business_seats.available);
  const [firstSeats, setFSeats] = useState(row.first_seats.available);
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





  function handleClickOpen2 (){
    setOpen2(true);
    setFlightNo(flight_no);
    setFrom(from);
    setAt(arrivalTerminal);
    setTo(to);
    setDt(departureTerminal);
    setArrivalTime(arrival_time);
    setDepartureTime(departure_time);
    setESeats(economySeats);
    setBSeats(businessSeats);
    setFSeats(firstSeats);
    setEcoBag(ecoBaggageAllowance);
    setEcoMax(ecoMaxSeats);                            
    setEcoPrice(ecoPrice);                                    

    setBusBag(busBaggageAllowance);
    setBusMax(busMaxSeats);        
    setBusPrice(busPrice);           

    setFirBag(firBaggageAllowance);
    setFirMax(firMaxSeats);        
    setFirPrice(firPrice);           

};

function handleCloseDone (){
  setFlightNo(flight_no?flight_no:row.flight_number);
  setFrom(from?from:row.from);
  setAt(arrivalTerminal?arrivalTerminal:row.arrival_terminal);
  setTo(to? to: row.to);
  setDt(departureTerminal?departureTerminal:row.departure_terminal);
  setArrivalTime(arrival_time? arrival_time: row.arrival_time);
  setDepartureTime(departure_time? departure_time: row.departure_time);
  setESeats(economySeats? economySeats: row.economy_seats.available);
  setBSeats(businessSeats? businessSeats: row.business_seats.available);
  setFSeats(firstSeats? firstSeats: row.first_seats.available);

  setEcoBag(ecoBaggageAllowance?ecoBaggageAllowance:row.economy_seats.baggage_allowance.$numberDecimal);
  setEcoMax(ecoMaxSeats?ecoMaxSeats:row.economy_seats.max_seats);
  setEcoPrice(ecoPrice?ecoPrice:row.economy_seats.price.$numberDecimal);

  setBusBag(busBaggageAllowance?busBaggageAllowance:row.business_seats.baggage_allowance.$numberDecimal);
  setBusMax(busMaxSeats?busMaxSeats:row.business_seats.max_seats);
  setBusPrice(busPrice?busPrice:row.business_seats.price.$numberDecimal);

  setFirBag(firBaggageAllowance?firBaggageAllowance:row.first_seats.baggage_allowance.$numberDecimal);
  setFirMax(firMaxSeats?firMaxSeats:row.first_seats.max_seats);
  setFirPrice(firPrice?firPrice:row.first_seats.price.$numberDecimal);

  setOpen2(false);
};
function handleClose2 (){
  setFlightNo(row.flight_number);
  setFrom(row.from);
  setDt(row.departure_terminal);
  setAt(row.arrival_terminal);
  setTo(row.to);
  setArrivalTime(row.arrival_time);
  setDepartureTime(row.departure_time);
  setESeats(row.economy_seats.available);
  setBSeats(row.business_seats.available);
  setFSeats(row.first_seats.available);

  setEcoPrice(row.economy_seats.price.$numberDecimal);             
  setEcoBag(row.economy_seats.baggage_allowance.$numberDecimal); 
  setEcoMax(row.economy_seats.max_seats);         

  setBusBag(row.business_seats.baggage_allowance.$numberDecimal);
  setBusMax(row.business_seats.max_seats);
  setBusPrice(row.business_seats.price.$numberDecimal);

  setFirBag(row.first_seats.baggage_allowance.$numberDecimal);
  setFirMax(row.first_seats.max_seats);
  setFirPrice(row.first_seats.price.$numberDecimal);
  setOpen2(false);
};

function foo2() {
  const data = {
      "flight_number": flight_no,
      "from": from,
      "to": to,
      "arrival_time": arrival_time,
      "departure_time": departure_time,
      "departure_terminal":departureTerminal,
      "arrival_terminal":arrivalTerminal,
      "economy_seats": {"max_seats":ecoMaxSeats,
            "available":economySeats,
            "price":ecoPrice,
            "baggage_allowance":ecoBaggageAllowance
            },
      "business_seats": {"max_seats":busMaxSeats,
            "available":businessSeats,
            "price":busPrice,
            "baggage_allowance":busBaggageAllowance
            },
      "first_seats": {"max_seats":firMaxSeats,
            "available":firstSeats,
            "price":firPrice,
            "baggage_allowance":firBaggageAllowance
            }
  }
  console.log("heeeeereeeee");
  console.log(data);
  axios.put("http://localhost:8000/api/flights/" +id, data, { "Content-Type": "application/json" })
      .then(result => {console.log(result);
        setRow(result.data[0]);
      handleCloseDone();
    }
      )
      .catch(err => console.log(err));
}



  return (
    <tr id={id}>
      <td>{flight_no}</td>
      <td>{from}</td>
      <td>{departureTerminal}</td>
      <td>{to}</td>
      <td>{arrivalTerminal}</td>
      <td>{economySeats}</td>
      <td>{businessSeats}</td>
      <td>{firstSeats}</td>
      <td>{departure_time}</td>
      <td>{arrival_time}</td>
      <td><button onClick={handleClickOpen2} className="btn edt"> Edit</button></td>
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
                            label="Departure Terminal"
                            value={departureTerminal}
                            onChange={function (e) {
                                    setDt(e.target.value);
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
                            id="outlined-number"
                            label="Arrival Terminal"
                            value={arrivalTerminal}
                            onChange={function (e) {
                                    setAt(e.target.value);
                            }
                            }
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
                            label="Max Economy Class seats"
                            type="number"
                            value={ecoMaxSeats}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setEcoMax(e.target.value);
                            }
                            }


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Available Economy Class seats"
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
                            label="Economy Class seat price"
                            type="number"
                            value={ecoPrice}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setEcoPrice(e.target.value);
                            }
                            }


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Economy Class Baggage Allowance"
                            type="number"
                            value={ecoBaggageAllowance}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setEcoBag(e.target.value);
                            }
                            }
                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Max Business Class seats"
                            type="number"
                            value={busMaxSeats}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setBusMax(e.target.value);
                            }
                            }


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Available Business Class seats"
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
                            label="Business Class seat price"
                            type="number"
                            value={busPrice}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setBusPrice(e.target.value);
                            }
                            }


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Business Class Baggage Allowance"
                            type="number"
                            value={busBaggageAllowance}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setBusBag(e.target.value);
                            }
                            }
                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Max First Class seats"
                            type="number"
                            value={firMaxSeats}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setFirMax(e.target.value);
                            }
                            }


                        />
                    </div>
                    <br></br>
                    <div>
                        <TextField

                            id="outlined-number"
                            label="Available Frist Class seats"
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
                            label="First seat Class price"
                            type="number"
                            value={firPrice}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={function (e) {
                                    setFirPrice(e.target.value);
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