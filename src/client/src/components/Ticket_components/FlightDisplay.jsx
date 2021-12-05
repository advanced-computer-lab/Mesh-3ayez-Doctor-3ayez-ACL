import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightDisplayHead from './FlightDisplayHead';
import TextField from '@mui/material/TextField';
import FlightDisplayBody from "./FlightDisplayBody";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FlightDisplay(probs) {

    const [open, setOpen] = React.useState(false);

    const [rid, setrid] = React.useState("");
    const [uid, setU] = React.useState({});

    const [rows, updateRows] = useState(probs.getRows);
    const [seats, upsateSeats] = useState(probs.getSeats);

    useEffect(() => {
        
        updateRows(probs.getRows);
        setrid(probs.getRows.reservation_id)

    }, [probs.getRows]);

    const handleClose = () => {
        setOpen(false);
    };
    function foo(id) {
        updateRows(rows.filter(x => (x._id !== id)));
        axios.delete("http://localhost:8000/api/flights/" + id);
        handleClose();
    }

    

    return (
        <div>
            <table className="styled-table2">
                <FlightDisplayHead />
                <tbody>
                    {
                        rows.map((sf) => {
                            return <FlightDisplayBody
                                key={sf._id}
                                _id={sf._id}
                                flight_number={sf.flight_number}
                                from={sf.from}
                                departure_terminal={sf.departure_terminal}
                                to={sf.to}
                                arrival_terminal={sf.arrival_terminal}
                                departure_time={sf.departure_time}
                                arrival_time={sf.arrival_time}
                                economy_seats = {sf.economy_seats}
                                business_seats = {sf.business_seats}
                                first_seats = {sf.first_seats}
                                seats = {seats}
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
                    {"Are you sure you want to cancel your reservation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirm to cancel your reservation for both departure and return flights.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => foo(rid)} autoFocus>
                        Cancel Reservations
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>Do Not Cancel reservations</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
export default FlightDisplay;
