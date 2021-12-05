import { useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import BasicAlert from "./BasicAlert";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function FlightForm() {
    console.log('I\'m here');
    const [flightNumber, setFlightNumber] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [arrivalTime, setArrivalTime] = useState(new Date());
    const [departureTime, setDepartureTime] = useState(new Date())
    const [economySeats, setESeats] = useState("")
    const [businessSeats, setBSeats] = useState("")
    const [firstSeats, setFSeats] = useState("")

    const [arrivalTerminal, setATerminal] = useState("")
    const [departureTerminal, setDTerminal] = useState("")

    const [ecoPrice, setEcoPrice] = useState("")
    const [ecoBaggageAllowance, setEcoBag] = useState("")

    const [busPrice, setBusPrice] = useState("")
    const [busBaggageAllowance, setBusBag] = useState("")

    const [firPrice, setFirPrice] = useState("")
    const [firBaggageAllowance, setFirBag] = useState("")

    const [errorFlight, setErrorFlight] = useState("");
    const [errorFrom, setErrorFrom] = useState("");
    const [errorTo, setErrorTo] = useState("");
    const [errorArrival, setErrorArrival] = useState("");
    const [errorDepature, setErrorDeparture] = useState("");
    const [errorEconomy, setErrorEconomy] = useState("");
    const [errorBusiness, setErrorBusiness] = useState("");
    const [errorFirst, setErrorFirst] = useState("");

    const [errorAt,setErrorAt]=useState("");
    const [errorDt,setErrorDt]=useState("");

    const [errorEcoP,setErrorEcoP]=useState("");
    const [errorBusP,setErrorBusP]=useState("");

    const [errorFirP,setErrorFirP]=useState("");
    const [errorEbag,setErrorEbag]=useState("");

    const [errorBbag,setErrorBbag]=useState("");
    const [errorFbag,setErrorFbag]=useState("");

    const [alert, setAlert] = useState(false);
    const [succ, setSucc] = useState(false);
    const [msg, setMsg] = useState("");



    const bool = false;

    const onSubmit = function (e) {
        e.preventDefault()
        const data = {
            "flight_number": flightNumber,
            "from": from,
            "departure_terminal":departureTerminal,
            "to": to,
            "arrival_terminal":arrivalTerminal,
            "arrival_time": arrivalTime,
            "departure_time": departureTime,
            "economy_seats": {"max_seats":economySeats,
            "available":economySeats,
            "price":ecoPrice,
            "baggage_allowance":ecoBaggageAllowance
            },
            "business_seats": {"max_seats":businessSeats,
            "available":businessSeats,
            "price":busPrice,
            "baggage_allowance":busBaggageAllowance
            },
            "first_seats": {"max_seats":firstSeats,
            "available":firstSeats,
            "price":firPrice,
            "baggage_allowance":firBaggageAllowance
            }
            

        }

        if (!flightNumber)
            setErrorFlight("This field is required");
        if (!from)
            setErrorFrom("This field is required");
        if (!to)
            setErrorTo("This field is required");
        if (!arrivalTime)
            setErrorArrival("This field is required");
        if (!departureTime)
            setErrorDeparture("This field is required");
        if (!economySeats)
            setErrorEconomy("This field is required");
        if (!businessSeats)
            setErrorBusiness("This field is required");
        if (!firstSeats)
            setErrorFirst("This field is required");
        if(!arrivalTerminal)
            setErrorAt("This field is required");
        if(!departureTerminal)
            setErrorDt("This field is required");
        if(!ecoPrice)
            setErrorEcoP("This field is required");
        if(!busPrice)
            setErrorBusP("This field is required");
        if(!firPrice)
            setErrorFirP("This field is required");
        if(!ecoBaggageAllowance)
            setErrorEbag("This field is required");
        if(!busBaggageAllowance)
            setErrorBbag("This field is required");
        if(!firBaggageAllowance)
            setErrorFbag("This field is required");

        if (flightNumber && from && to && arrivalTime && departureTime && economySeats && businessSeats && firstSeats && arrivalTerminal &&departureTerminal &&ecoBaggageAllowance&&ecoPrice&&busBaggageAllowance&&busPrice&&firBaggageAllowance&firPrice) {
            axios.post("http://localhost:8000/api/flights", data, { "Content-Type": "application/json" })
                .then(
                    result => {
                        setSucc(result.data.success);
                        setMsg(result.data.msg)
                        setAlert(true);

                    }

                )
                .catch(err => console.log(err));
        }
        setAlert(false);

    }
    return (

        <div style={{margin:"auto", marginTop:"100px", height:"500px" }}>   
            <div style={{margin:"auto",backgroundColor:"#142F43",width:"640px",height:"80px",textAlign:"center",boxShadow:"px #999999"}}>
                <h1 style={{color:"whitesmoke",padding:"20px"}}>Create New Flight</h1>
            </div> 
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                width="600px"
                padding="20px"
                style={{ background: "#F7F7F7" ,borderRaduis:"10%",boxShadow:"2px auto #999999"}}
                display="inline-block"
                
            >
                        <TextField
                            required
                            onChange={function (e) {
                                setFlightNumber(e.target.value);
                                setErrorFlight(e.target.value ? "" : "This field is required");
                            }
                            }
                            id="outlined-required"
                            label="Flight number"
                            type="number"
                            error={errorFlight ? true : false}
                            helperText={errorFlight}
                        />

                <TextField
                    required
                    id="outlined-required"
                    label="From"
                    onChange={function (e) {
                        setFrom(e.target.value);
                        setErrorFrom(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorFrom ? true : false}
                    helperText={errorFrom}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Departure Terminal"
                    onChange={function (e) {
                        setDTerminal(e.target.value);
                        setErrorDt(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorDt ? true : false}
                    helperText={errorDt}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="To"
                    onChange={function (e) {
                        setTo(e.target.value);
                        setErrorTo(e.target.value ? "" : "This field is required")
                    }}
                    error={errorTo ? true : false}
                    helperText={errorTo}
                />
                 <TextField
                    required
                    id="outlined-required"
                    label="Arrival Terminal"
                    onChange={function (e) {
                        setATerminal(e.target.value);
                        setErrorAt(e.target.value ? "" : "This field is required")
                    }}
                    error={errorAt ? true : false}
                    helperText={errorAt}
                />
                {/* <TextField
                    required
                    onChange={function (e) {
                        setArrivalTime(e.target.value);
                        setErrorArrival(e.target.value ? "" : "This field is required");
                    }
                    }
                    id="outlined-required"
                    label="Arrival Time"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="yyyy-mm-dd"
                    error={errorArrival ? true : false}
                    helperText={errorArrival}
                />    <LocalizationProvider dateAdapter={AdapterDateFns}> */}

                {/* <DesktopTimePicker
          label="Arrival time"
          value={arrivalTime}
          onChange={(newValue) => {
            setArrivalTime(newValue);
            setErrorArrival(newValue ? "" : "This field is required");
            console.log(newValue);

          }}
          renderInput={(params) => <TextField InputLabelProps={{
            shrink: true,
        }} error={errorArrival==null ? true : false}
          helperText={errorArrival} {...params} />}
        /> */}

<LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Departure time"
        value={departureTime}
        onChange={(newValue) => {
          setDepartureTime(newValue);
        }}
      />
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Arrival time"
        value={arrivalTime}
        onChange={(newValue) => {
          setArrivalTime(newValue);
        }}
      />
    </LocalizationProvider>

        {/* </LocalizationProvider>
                <TextField
                    required
                    onChange={function (e) {
                        setDepartureTime(e.target.value);
                        setErrorDeparture(e.target.value ? "" : "This field is required");
                    }

                    }
                    id="outlined-required"
                    label="Departure time"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="yyyy-mm-dd"
                    error={errorDepature ? true : false}
                    helperText={errorDepature}
                /> */}
                <TextField
                    required
                    id="outlined-number"
                    label="Economy seats"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setESeats(e.target.value);
                        setErrorEconomy(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorEconomy ? true : false}
                    helperText={errorEconomy}

                />
                <TextField
                    required
                    id="outlined-number"
                    label="Economy class Seat Price"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setEcoPrice(e.target.value);
                        setErrorEcoP(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorEcoP ? true : false}
                    helperText={errorEcoP}

                />
                <TextField
                    required
                    id="outlined-number"
                    label="Economy class Baggage Allowance"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setEcoBag(e.target.value);
                        setErrorEbag(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorEbag ? true : false}
                    helperText={errorEbag}

                />
                <TextField
                    required
                    id="outlined-number"
                    label="Business seats"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setBSeats(e.target.value);
                        setErrorBusiness(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorBusiness ? true : false}
                    helperText={errorBusiness}
                />
                 <TextField
                    required
                    id="outlined-number"
                    label="Business class Seat Price"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setBusPrice(e.target.value);
                        setErrorBusP(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorBusP ? true : false}
                    helperText={errorBusP}

                />
                <TextField
                    required
                    id="outlined-number"
                    label="Business class Baggage Allowance"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setBusBag(e.target.value);
                        setErrorBbag(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorBbag ? true : false}
                    helperText={errorBbag}

                />
                <TextField
                    required
                    id="outlined-number"
                    label="First seats"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setFSeats(e.target.value);
                        setErrorFirst(e.target.value ? "" : "This field is required");
                    }

                    }
                    error={errorFirst ? true : false}
                    helperText={errorFirst}
                />
                <TextField
                    required
                    id="outlined-number"
                    label="First class Seat Price"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setFirPrice(e.target.value);
                        setErrorFirP(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorFirP ? true : false}
                    helperText={errorFirP}

                />
                <TextField
                    required
                    id="outlined-number"
                    label="First class Baggage Allowance"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={function (e) {
                        setFirBag(e.target.value);
                        setErrorFbag(e.target.value ? "" : "This field is required");
                    }
                    }
                    error={errorFbag ? true : false}
                    helperText={errorFbag}

                />
                
                <br />
                <Stack direction="row" spacing={1} >
                    <Button style={{textAlign:"center",marginLeft:"auto"}} variant="contained" onClick={onSubmit} href="/createFlight">Submit </Button>
                    <Button style={{margin:"auto"}} variant="outlined" href="/admin">Back </Button>
                </Stack>
                <br />

                {alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}

            </Box>
        </div>
    );
}