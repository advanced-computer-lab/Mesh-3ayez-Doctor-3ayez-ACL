import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableHead from './TableHead';
import TableRow from "./TableRow";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [fid, setfid] = React.useState("");
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
                    <Button variant="contained" onClick={()=>foo(fid)} autoFocus>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>


        </div>
    );
}
export default Dashboard;
