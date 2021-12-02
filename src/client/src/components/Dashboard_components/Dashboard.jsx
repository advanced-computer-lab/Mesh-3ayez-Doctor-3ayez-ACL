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

function Dashboard(probs) {

    const [open, setOpen] = React.useState(false);

    const [fid, setfid] = React.useState("");
    const [uid, setU] = React.useState({});

    const [rows, updateRows] = useState(probs.getRows);

    useEffect(() => {
        
        updateRows(probs.getRows);

    }, [probs.getRows]);
     
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
                                departure_terminal={flight.departure_terminal}
                                to={flight.to}
                                arrival_terminal={flight.arrival_terminal}
                                economy_seats={flight.economy_seats.available}
                                business_seats={flight.business_seats.available}
                                first_seats={flight.first_seats.available}
                                departure_time={flight.departure_time}
                                arrival_time={flight.arrival_time}
                                delete_callback={handleClickOpen}
                                eco_max_seats={flight.economy_seats.max_seats}
                                eco_price={flight.economy_seats.price}
                                eco_bag={flight.economy_seats.baggage_allowance}

                                bus_max_seats={flight.business_seats.max_seats}
                                bus_price={flight.business_seats.price}
                                bus_bag={flight.business_seats.baggage_allowance}

                                fir_max_seats={flight.first_seats.max_seats}
                                fir_price={flight.first_seats.price}
                                fir_bag={flight.first_seats.baggage_allowance}
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

        </div>
    );
}
export default Dashboard;
