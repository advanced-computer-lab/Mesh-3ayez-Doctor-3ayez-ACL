import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableHead from './TableHead';
import TextField from '@mui/material/TextField';
import TableRow from "./TableRow";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [fid, setfid] = React.useState("");
    const [uid, setU] = React.useState({});

    const [flight_no, setFlightNo] = React.useState('');
    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
    const [economySeats, setESeats] = React.useState("")
    const [businessSeats, setBSeats] = React.useState("")
    const [firstSeats, setFSeats] = React.useState("")
    const [arrival_time, setArrivalTime] = React.useState('');
    const [departure_time, setDepartureTime] = React.useState('');
    const [rows, updateRows] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/flights/")
            .then(res => {

                updateRows(res.data);
                //   console.log(res.data);
            })

    }, []);

    const handleClickOpen = (id) => {
        setOpen(true);
        setfid(id);
        console.log(id)
    };

    const handleClose = () => {
        setOpen(false);
    };
    function foo(id) {
        updateRows(rows.filter(x => (x._id !== id)));
        axios.delete("http://localhost:8000/api/flights/" + id);
        handleClose();
    }
    const handleClickOpen2 = (row) => {
        setOpen2(true);
        setU(row)
        setFlightNo(row.flight_number);
        setFrom(row.from);
        setTo(row.to);
        setArrivalTime(new Date(row.arrival_time));
        console.log(row.arrival_time)
        setDepartureTime(row.departure_time);
        setESeats(row.economy_seats);
        setBSeats(row.business_seats);
        setFSeats(row.first_seats);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    function foo2(uid) {
        const data = {
            "id": uid.id,
            "flight_number": flight_no,
            "from": from,
            "to": to,
            "arrival_time": arrival_time,
            "departure_time": departure_time,
            "economy_seats": economySeats,
            "business_seats": businessSeats,
            "first_seats": firstSeats
        }
        axios.put("http://localhost:8000/api/flights/" + uid.id, data, { "Content-Type": "application/json" })
            .then(result => console.log(result))
            .catch(err => console.log(err));
            updateRows(rows);
        handleClose2();
    }
    return (
        <div>
            <table className="styled-table">
                <TableHead />
                <tbody>
                    {
                        rows.map((flight) => {
                            return <TableRow
                                key={flight._id}
                                id={flight._id}
                                flight_number={flight.flight_number}
                                from={flight.from}
                                to={flight.to}
                                economy_seats={flight.economy_seats}
                                business_seats={flight.business_seats}
                                first_seats={flight.first_seats}
                                departure_time={flight.departure_time}
                                arrival_time={flight.arrival_time}
                                edit_callback={handleClickOpen2}
                                delete_callback={handleClickOpen}
                            />
                        })
                    }

                </tbody>

            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" >
                    {"Are you sure you want to delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirm to delete this flight. This means that data deleted could not be restored
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => foo(fid)} autoFocus>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
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
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => foo2(uid)} autoFocus>
                        Done
                    </Button>
                    <Button variant="outlined" onClick={handleClose2}>Cancel</Button>

                </DialogActions>
            </Dialog>


        </div>
    );
}
export default Dashboard;
