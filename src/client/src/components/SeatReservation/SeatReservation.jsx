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
import Stripe from 'react-stripe-checkout';
import { ResItinerary } from "./ResItinerary";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material';
import { set } from "mongoose";
import UserNavBar from "../UserNavBar";
export function SeatReservation() {
    const history = useHistory();
    const location = useLocation();
    const reserved = location.state.reserved;
    const reservation = location.state.reservation;
    const ret = location.state.return ? reserved : location.state.retFlight;
    const departure = location.state.departure ? reserved : location.state.depFlight;
    console.log(location.state.retFlight);
    const diff = Number(reserved.price);
    const [flightSeats, setFlightSeats] = useState([]);
    const [seatsLoading, setSeatsLoading] = useState(true);
    const [other, setOther] = useState([]);
    const [load, setLoad] = useState(false);
    const [newOther,setNewOther]=useState([]);
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

        if (!load) {
            if (location.state.return) {
                axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.departure_flight + "/" + cabinType)
                    .then(res => {
                        for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i]['reservation_id'] == reservation._id) {
                                setOther(other.push(res.data[i].seat_name+" "));
                            }
                        }
                        setNewOther(other);
                    })
            } else {
                axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.return_flight + "/" + cabinType)
                    .then(res => {
                        for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i]['reservation_id'] == reservation._id) {
                                // other.push();
                                setOther(other.push(res.data[i].seat_name+" "));
                            }
                        }
                        setNewOther(other);
                    })
            }
            setLoad(true);
        }
    }, []);
    var Rows = [];
    buildSeatRows(flightSeats, Rows);
    var old = 0;
    if (location.state.return) {
        if (cabinType.toLowerCase() === "economy") {
            old = location.state.retFlight.economy_seats.price['$numberDecimal'];
        }
        else if (cabinType.toLowerCase() === "business") {
            old = location.state.retFlight.business_seats.price['$numberDecimal'];
        }
        else {
            old = location.state.retFlight.first_seats.price['$numberDecimal'];
        }

    } else {
        if (cabinType.toLowerCase() === "economy") {
            old = location.state.depFlight.economy_seats.price['$numberDecimal'];
        }
        else if (cabinType.toLowerCase() === "business") {
            old = location.state.depFlight.business_seats.price['$numberDecimal'];
        }
        else {
            old = location.state.depFlight.first_seats.price['$numberDecimal'];
        }
    }
    var oneSeatPrice = Number(old) + (diff / (reservation.number_of_passengers));
    var oneSeatBag = reserved.baggage;
    // handle price
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [paymentRef, setPaymentRef] = useState(false);
    const [it, setIt] = useState(false);
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
            if (diff < 0)
                setPaymentRef(true);
            else
                setConfirm(true);
        }
        else {
            setOpen(true);
        }
    }
    function handleClose() {
        setConfirm(false);
        setOpen(false);
        setPaymentRef(false);
        setIt(false);
    }
    function handleCloseIt() {
        setConfirm(false);
        setOpen(false);
        setPaymentRef(false);
        setIt(false);
        history.push({
            pathname: '/user/reservation',
        });
    }
    const tokenHandler = (token) => {
        reserve(token);
    }
    function cb() {
        reserve(null);
    }
    function reserve(token) {
        var data = {
            seats: reservedSeats,
            new_flight_id: reserved.flight_id,
            stripeToken: token,
        };
        console.log(reservation);
        const oldFlight = location.state.return ? reservation.return_flight : reservation.departure_flight;
        axios.put("http://localhost:8000/api/reservations/changeFlight/" + reservation._id + "/" + reservation.user_id + "/" + oldFlight, data).catch(err => {
            console.log(err.response.data.msg);
        })
        setConfirm(false);
        setPaymentRef(false);
        setIt(true);
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
            if ((i + 1) % 2 == 0 && (i + 1) % 4 != 0)
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
    function reserveDone() {
        handleClose();
        history.push({
            pathname: '/user/reservation',
        });
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
            <UserNavBar />
            <Box style={{ marginTop: "100px" }} display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
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
                                            <ListItemText primary="Departure Time" secondary={reserved.departure_time} />
                                            <ListItemText primary="Arrival Time" secondary={reserved.arrival_time} />
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
                        {seatsLoading ? null : <Seats bag={oneSeatBag} bagCB={setBag} price={oneSeatPrice} addclbk={addS} rmvclbk={removeS} type="Departure" priceCallBack={setPrice} style={{ display: "inline-block" }} rows={Rows} maxReservableSeats={reserved.number_of_passengers} visible />}
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
                        Are you sure you want to book these seats? The price difference is {diff}. Click pay to proceed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div style={{ marginRight: "1%" }}>
                        <Stripe
                            stripeKey='pk_test_51KACNtHLa29h6dWHVk2jjBX8fyb4f9blEHCnHoaLgaBJLGYNjp3UTBmBgi5EMifGmV9vfADqIwaArtgM8YwpeSl400CQ0mDxk8'
                            token={tokenHandler}
                        />
                    </div>
                    <Button variant="outlined" onClick={handleClose}>NO</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={paymentRef}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You will get refunded with amount of {-1*diff}$.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={cb}>GO ON</Button>
                    <Button variant="outlined" onClick={handleClose}>NO</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={it}
                onClose={handleCloseIt}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogContent>
                    <ResItinerary />
                </DialogContent>
                <ResItinerary
                    resId={reservation._id}
                    price={Number(reservation.price['$numberDecimal']) + diff}
                    depFrom={departure.from}
                    depDDay={new Date(departure.departure_time).getDate() + "/" + (new Date(departure.departure_time).getMonth() + 1) + "/" + new Date(departure.departure_time).getFullYear()}
                    depDTime={new Date(departure.departure_time).getHours() + ":" + new Date(departure.departure_time).getMinutes()}
                    depDT={departure.departure_terminal}
                    depTo={departure.to}
                    depADay={new Date(departure.arrival_time).getDate() + "/" + (new Date(departure.arrival_time).getMonth() + 1) + "/" + new Date(departure.arrival_time).getFullYear()}
                    depATime={new Date(departure.arrival_time).getHours() + ":" + new Date(departure.arrival_time).getMinutes()}
                    depAT={departure.arrival_terminal}
                    depSeats={location.state.departure?seats:other}
                    cabin={cabinType}
                    retFrom={ret.from}
                    retDDay={new Date(ret.departure_time).getDate() + "/" + (new Date(ret.departure_time).getMonth() + 1) + "/" + new Date(ret.departure_time).getFullYear()}
                    retDTime={new Date(ret.departure_time).getHours() + ":" + new Date(ret.departure_time).getMinutes()}
                    retDT={ret.departure_terminal}
                    retTo={ret.to}
                    retADay={new Date(ret.arrival_time).getDate() + "/" + (new Date(ret.arrival_time).getMonth() + 1) + "/" + new Date(ret.arrival_time).getFullYear()}
                    retATime={new Date(ret.arrival_time).getHours() + ":" + new Date(ret.arrival_time).getMinutes()}
                    retAT={ret.arrival_terminal}
                    retSeats={newOther}
                />
                <DialogActions>
                    <Button variant="outlined" onClick={reserveDone}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

