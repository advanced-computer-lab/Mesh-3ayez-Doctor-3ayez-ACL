import { useState,useEffect } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { Alert } from "@mui/material";
import { color } from "@mui/system";
import reactDom from "react-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { set } from "mongoose";

export default function FlightForm() {
    const [flightNumber, setFlightNumber] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [arrivalTime, setArrivalTime] = useState("")
    const [departureTime, setDepartureTime] = useState("")
    const [economySeats, setESeats] = useState("")
    const [businessSeats, setBSeats] = useState("")
    const [firstSeats, setFSeats] = useState("")
    const [errorFlight, setErrorFlight] = useState("");
    const [errorFrom, setErrorFrom] = useState("");
    const [errorTo, setErrorTo] = useState("");
    const [errorArrival, setErrorArrival] = useState("");
    const [errorDepature, setErrorDeparture] = useState("");
    const [errorEconomy, setErrorEconomy] = useState("");
    const [errorBusiness, setErrorBusiness] = useState("");
    const [errorFirst, setErrorFirst] = useState("");
    
    const [u,setU]=useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/flights")
        .then(res=>{
            setU(res.data);
        })
       
    }, [])
    console.log(u)
    const onSubmit = function (e) {
        e.preventDefault()
        const data = {
            "flight_number": flightNumber,
            "from": from,
            "to": to,
            "arrival_time": arrivalTime,
            "departure_time": departureTime,
            "economy_seats": economySeats,
            "business_seats": businessSeats,
            "first_seats": firstSeats
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

        if (flightNumber && from && to && arrivalTime && departureTime && economySeats && businessSeats && firstSeats)
            axios.post("http://localhost:8000/api/flights", data,{ 'Content-Type': 'application/json' })
                .then()
                .catch(err => console.log(err));

    }        
    return (
        <div className="main">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                width="400px"
                margin="auto"
            >
                <div>
                    <div>
                        <div >
                            <TextField
                                required
                                onChange={function (e) {
                                    setFlightNumber(e.target.value);
                                    setErrorFlight(e.target.value ? "" : "This field is required");
                                }
                                }
                                id="outlined-required"
                                label="Flight number"
                                error={errorFlight?true:false}
                                helperText={errorFlight}
                            />
                        </div>
                        <div id="from" >
                        </div>
                    </div>
                    <TextField
                        required
                        id="outlined-required"
                        label="From"
                        onChange={function (e) {
                            setFrom(e.target.value);
                            setErrorFrom(e.target.value ? "" : "This field is required");
                        }
                        }
                        error={errorFrom?true:false}
                        helperText={errorFrom}

                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="To"
                        onChange={function (e) {
                            setTo(e.target.value);
                            setErrorTo(e.target.value? "" : "This field is required")
                        }}
                        error={errorTo?true:false}
                        helperText={errorTo}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            required  
                            id="outlined-required"
                            label="Arrival time"
                            value={arrivalTime}
                            onChange={(newValue) => {
                                setArrivalTime(newValue);
                                setErrorArrival(newValue ? "" : "This field is required");

                            }}
                            error={errorArrival?true:false}
                            helperText={errorArrival}
                        />
                    </LocalizationProvider> */}
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField required id="outlined-required"  error={errorDepature==null?true:false}
                            helperText={errorDepature} {...props} />}
                            clearable
                            label="Departure time"
                            value={departureTime}
                            onChange={function (newValue) {
                                console.log(newValue);
                                setDepartureTime(newValue);
                                setErrorDeparture(newValue!=null? "" : "This field is required");
                            }

                            }
                        />
                    </LocalizationProvider> */}
                    <TextField
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
                        error={errorArrival}
                        helperText={errorArrival}

                    /> 
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
                        error={errorDepature}
                        helperText={errorDepature}
                    />
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
                        error={errorEconomy?true:false}
                        helperText={errorEconomy}

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
                        error={errorBusiness?true:false}
                        helperText={errorBusiness}
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
                        error={errorFirst?true:false}
                        helperText={errorFirst}
                    />
                    <br />
                    <Button variant="contained" onClick={onSubmit} >Submit </Button>


                </div>

            </Box>
        </div>
    );
}

