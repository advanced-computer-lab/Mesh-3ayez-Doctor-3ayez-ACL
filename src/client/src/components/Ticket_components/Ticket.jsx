import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketHead from './TicketHead';
import TextField from '@mui/material/TextField';
import TicketBody from "./TicketBody";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

function Ticket(probs) {
    
    const [open, setOpen] = React.useState(false);

    const [rid, setrid] = React.useState("");
    const [uid, setU] = React.useState({});

    const [rows, updateRows] = useState(probs.getRows);

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
            <Box sx={{background:'white'}}>
            <table className={"styled-table"+(rows[0].seat_type == 'economy'?3:(rows[0].seat_type == 'business'?'':2))}>
                <TicketHead />
                <tbody>
                    {
                        rows.map((sf) => {
                            return <TicketBody
                               
                                key={sf._id}
                                _id={sf._id}
                                flight_id = {sf.flight_id}
                                reservation_id = {sf.reservation_id}
                                seat_type = {sf.seat_type}
                                seat_name = {sf.seat_name}
                                price = {sf.seat_type == 'economy'?sf.flight_details[0].economy_seats.price.$numberDecimal:(
                                    sf.seat_type == 'first'?sf.flight_details[0].first_seats.price.$numberDecimal:
                                    sf.flight_details[0].business_seats.price.$numberDecimal
                                )}
                                baggage_allowance = {sf.seat_type == 'economy'?sf.flight_details[0].economy_seats.baggage_allowance.$numberDecimal:(
                                    sf.seat_type == 'first'?sf.flight_details[0].first_seats.baggage_allowance.$numberDecimal:
                                    sf.flight_details[0].business_seats.baggage_allowance.$numberDecimal)}
                                flight_details = {sf.flight_details}
                                
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
            </Box>
        </div>
    );
}
export default Ticket;
