import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SeatGuide from "./SeatGuide";
import Seats from "./Seats";
import axios from "axios";
import { Box } from "@mui/system";
import Ticket from '../Ticket_components/Ticket';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material';
export function SeatReservation() {
    const history= useHistory();
    const location = useLocation();
    const reserved = location.state.reserved;
    const [flightSeats, setFlightSeats] = useState([]);
    const [seatsLoading, setSeatsLoading] = useState(true);
    let cabinType = reserved.cabin_type;
    useEffect(() => {
        axios.get("http://localhost:8000/api/flights/all_seats/" + reserved.flight_id + "/" + cabinType)
            .then(res => {
                setFlightSeats(res.data);
                setSeatsLoading(false);
            })
            .catch(() => {
                console.log("BOOM");
            });
    }, []);
    var Rows = [];
    buildSeatRows(flightSeats, Rows);
    var oneSeatPrice=reserved.price;
    var oneSeatBag=reserved.baggage;
    // handle price
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [price, setPrice] = useState(0);
    const [bag, setBag] = useState(0);
    const [seats, setSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    function addS(x, i) {
        seats.push(x);
        reservedSeats.push(i);
        setSeats(seats);
        setReservedSeats(reservedSeats);
    }
    function removeS(x, i) {

        setSeats(seats.filter((y) => x != y));
        setReservedSeats(reservedSeats.filter((j) => j != i));
    }
    function submitHandler() {
        if (reserved.number_of_passengers == seats.length) {
            setConfirm(true);
        }
        else {
            setOpen(true);
        }
    }
    function handleClose() {
        setConfirm(false);
        setOpen(false);
    }
    function reserve() {
        // var data={
        //     user_id:"61bcd1e7bf1ace92644c0287", // to be handled
        //     departure_flight:departure.flight_id,
        //     return_flight:ret.flight_id,
        //     number_of_passengers:Number(departure.number_of_passengers),
        //     cabin_type:departure.cabin_type,
        //     departure_seats:reservedDepSeats,
        //     return_seats:reservedRetSeats
        // };
        // console.log(data);
        // axios.post("http://localhost:8000/api/reservations",data);
        // history.go();
        // console.log("done");
        setConfirm(false);
    }
    function buildSeatRows(seats, rows) {
        var rem = seats.length % 4;
        var row = [];
        for (var i = 0; i < seats.length - rem; i++) {
            if (i % 4 == 0 && i != 0) {
                rows.push(row);
                row = [];
            }
            var seat = seats[i];
    
            var isReserved = seat['reservation_id'] != null;
            var seat = { 'id': seat._id, number: seat.seat_name, isReserved: isReserved };
            row.push(seat);
            if((i+1)%2==0&&(i+1)%4!=0)
                row.push(null);
            
        }
        if (row.length > 0) {
            rows.push(row);
            row = [];
        }
        for (var i = 0; i < rem; i++) {
            var seat = seats[seats.length - rem + i];
            var isReserved = seat['reservation_id'] != null;
            var seat = { 'id': seat._id, number: seat.seat_name, isReserved: isReserved };
            row.push(seat);
        }
        if (row.length > 0) {
            rows.push(row);
            row = [];
        }
    }

    var head = "";
    if (cabinType.toLowerCase() === "economy")
        head = "Economy Class";
    else if (cabinType.toLowerCase() === "business")
        head = "Buisness Class";
    else
        head = "First Class";
    return (
        <div className="App" style={{ backgroundColor: "#D4ECDD", minHeight: "750px" }}>
            <div style={{ height: "80px", backgroundColor: "#181D31" }}><h3 style={{ color: "whitesmoke", margin: "auto", padding: "30px" }}><strong>{head}</strong></h3></div>
            <Box style={{marginTop:"100px"}} display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 8">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="sm">
                            <Paper elevation={3}>
                                <Box sx={{ bgcolor: '#F3950D', height: '2vh' }} style={{ marginTop: "2%" }} />
                                <Box sx={{ bgcolor: 'whitesmoke', height: '47vh' }} >
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 600
                                        }}
                                    >
                                        <ListItem>
                                            <ListItemText primary="Flight Number" secondary={reserved.flight_number} />
                                            <ListItemText primary="From" secondary={reserved.from} />
                                            <ListItemText primary="To" secondary={reserved.to} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Departure Terminals" secondary={reserved.departure_terminal} />
                                            <ListItemText primary="Arrival Terminals" secondary={reserved.arrival_terminal} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Departure Time" secondary={reserved.departure_time}/>
                                            <ListItemText primary="Arrival Time" secondary={reserved.arrival_terminal} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Seats" secondary={seats} />
                                            <ListItemText primary="Price" secondary={price} />
                                            <ListItemText primary="Baggage Allowance" secondary={bag} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Paper>
                        </Container>
                    </React.Fragment>

                </Box>
                <Box gridColumn="span 4">
                    <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                        {seatsLoading? null : <Seats bag ={oneSeatBag} bagCB={setBag} price={oneSeatPrice} addclbk={addS} rmvclbk={removeS} type="Departure" priceCallBack={setPrice} style={{ display: "inline-block" }} rows={Rows} maxReservableSeats={reserved.number_of_passengers} visible />}
                    </div> 
                </Box>
                <Box gridColumn="span 3">
                </Box>
                <Box gridColumn="span 5">
                    <Button variant="contained" size="medium" onClick={submitHandler}> confirm </Button>

                </Box>
                <Box gridColumn="span 4">
                <SeatGuide />
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Oops!It seems that you did not choose your all seats.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={confirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to book these flights?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={reserve}>GO ON</Button>
                    <Button variant="outlined" onClick={handleClose}>NO</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

