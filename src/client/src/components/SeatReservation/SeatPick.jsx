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
import Stripe from 'react-stripe-checkout'
import { ResItinerary } from "./ResItinerary";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material';
import { set } from "mongoose";
import UserNavBar from "../UserNavBar";
const colors = require("../../colors");

export function SeatPick() {
    const history = useHistory();
    const location = useLocation();
    const departure = location.state.departure;
    const ret = location.state.return;
    const [resId, setResId] = useState("");
    const [depSeats, setDepSeats] = useState([]);
    const [depSeatsLoading, setDepSeatsLoading] = useState(true);
    const [retSeatsLoading, setRetSeatsLoading] = useState(true);
    let depCabinType = departure.cabin_type;
    console.log("dep id: " + departure.flight_id + ", return id: " + ret.flight_id + ", cabin: " + departure.cabin_type);
    const [retSeats, setRetSeats] = useState([]);
    let retCabinType = ret.cabin_type;
    useEffect(() => {
        axios.get("http://localhost:8000/api/flights/all_seats/" + departure.flight_id + "/" + depCabinType,
            { headers: { 'authentication-token': localStorage.getItem('token'), "Content-Type": "application/json" } }
        )
            .then(res => {

                setDepSeats(res.data);
                setDepSeatsLoading(false);
                console.log(depSeats);
            })
            .catch(() => {
                console.log("BOOM");
            });
        axios.get("http://localhost:8000/api/flights/all_seats/" + ret.flight_id + "/" + retCabinType,
            { headers: { 'authentication-token': localStorage.getItem('token'), "Content-Type": "application/json" } }
        )
            .then(res => {
                setRetSeats(res.data);
                setRetSeatsLoading(false);

            });
    }, []);

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/flights/all_seats/" + ret.flight_id + "/" + retCabinType)
    //         .then(res => {
    //             setRetSeats(res.data);
    //         });
    // },[]);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
    }));
    var depRows = [];
    buildSeatRows(depSeats, depRows);
    var retRows = [];
    buildSeatRows(retSeats, retRows);
    var oneSeatPriceDep = departure.price;
    var oneSeatPriceRet = ret.price;
    var oneSeatBagDep = departure.baggage;
    var oneSeatBagRet = ret.baggage;

    // handle price
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [priceDep, setPriceDep] = useState(0);
    const [priceRet, setPriceRet] = useState(0);
    const [bagDep, setBagDep] = useState(0);
    const [bagRet, setBagRet] = useState(0);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [reservedDepSeats, serReservedDepSeats] = useState([]);
    const [reservedRetSeats, serReservedRetSeats] = useState([]);
    const [it, setIt] = useState(false);
    function addDepS(x, i) {
        departureSeats.push(x);
        reservedDepSeats.push(i);
        setDepartureSeats(departureSeats);
        serReservedDepSeats(reservedDepSeats);
    }
    function removeDepS(x, i) {

        setDepartureSeats(departureSeats.filter((y) => x != y));
        serReservedDepSeats(reservedDepSeats.filter((j) => j != i));
    }
    function addRetS(x, i) {
        returnSeats.push(x);
        reservedRetSeats.push(i);
        setReturnSeats(returnSeats);
        serReservedRetSeats(reservedRetSeats);
    }
    function removeRetS(x, i) {

        setReturnSeats(returnSeats.filter((y) => x != y));
        serReservedRetSeats(reservedRetSeats.filter((j) => j != i));
    }
    function submitHandler() {
        console.log(ret.number_of_passengers)
        if (departure.number_of_passengers == departureSeats.length && ret.number_of_passengers == returnSeats.length) {
            setConfirm(true);
        }
        else {
            setOpen(true);
        }
    }
    function handleClose() {
        setConfirm(false);
        setOpen(false);
        setIt(false);
    }
    function handleCloseIt() {
        setConfirm(false);
        setOpen(false);
        setIt(false);
        history.push({
            pathname: '/user/reservation',
        });
    }
    function backHandler() {
        history.goBack();
    }
    const tokenHandler = (token) => {
        // handleToken(100, token)
        reserve(token);
    }
    function reserveDone() {
        handleClose();
        history.push({
            pathname: '/user/reservation',
        });
    }
    function reserve(token) {
        var user_id = localStorage.getItem('user_id');
        user_id = user_id.substring(1, user_id.length - 1);
        console.log(localStorage.getItem('token'));
        var data = {
            user_id: user_id, // to be handled
            departure_flight: departure.flight_id,
            return_flight: ret.flight_id,
            number_of_passengers: Number(departure.number_of_passengers),
            cabin_type: departure.cabin_type,
            departure_seats: reservedDepSeats,
            return_seats: reservedRetSeats,
            stripeToken: token
        };
        console.log(data);
        axios.post("http://localhost:8000/api/reservations", data,
            { headers: { 'authentication-token': localStorage.getItem('token'), "Content-Type": "application/json" } })
            .then(result => {
                setResId(result.data.reservation_id);
            });
        // history.go();
        console.log("done");
        setConfirm(false);
        setIt(true);
    }
    var depTcktData = {
        key: "",
        _id: "",
        flight_id: "",
        reservation_id: "",
        seat_type: "",
        seat_name: departureSeats,
        price: priceDep,
        baggage_allowance: "",
        flight_details: [{ seat_type: "economy", economy_seats: { price: 125, baggage_allowance: 125 } }]
    };
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
    if (depCabinType.toLowerCase() === "economy")
        head = "Economy Class";
    else if (depCabinType.toLowerCase() === "business")
        head = "Buisness Class";
    else
        head = "First Class";
    return (
        <div className="App" style={{ backgroundColor: "White", height: "1000px" }}>
            <UserNavBar />
            {/* <div style={{ height: "80px", backgroundColor: "#181D31" }}><h3 style={{ color: "whitesmoke", margin: "auto", padding: "30px" }}><strong>{head}</strong></h3></div> */}
            {/* <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} >
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={4}>


                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={8}>
                        <Grid item xs={12} >
                            <Grid item xs={0}></Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <SeatGuide />
                    </Grid>
                </Grid>
            </Grid> */}
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 8">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="sm">
                            <Paper elevation={3}>
                                <Box sx={{ bgcolor: colors.c3, height: '2vh' }} style={{ marginTop: "2%" }} />
                                <Box sx={{ bgcolor: 'whitesmoke', height: '47vh' }} >
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 600
                                        }}
                                    >
                                        <ListItem>
                                            <ListItemText style={{ color: colors.c1 }} primary="Flight Number" secondary={departure.flight_number} />
                                            <ListItemText style={{ color: colors.c1 }} primary="From" secondary={departure.from} />
                                            <ListItemText style={{ color: colors.c1 }} primary="To" secondary={departure.to} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText style={{ color: colors.c1 }} primary="Departure Terminals" secondary={departure.departure_terminal} />
                                            <ListItemText style={{ color: colors.c1 }} primary="Arrival Terminals" secondary={departure.arrival_terminal} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText style={{ color: colors.c1 }} primary="Departure Time" secondary={departure.departure_time} />
                                            <ListItemText style={{ color: colors.c1 }} primary="Arrival Time" secondary={departure.arrival_time} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText style={{ color: colors.c1 }} primary="Seats" secondary={departureSeats} />
                                            <ListItemText style={{ color: colors.c1 }} primary="Price" secondary={priceDep} />
                                            <ListItemText style={{ color: colors.c1 }} primary="Baggage Allowance" secondary={bagDep} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Paper>

                        </Container>
                    </React.Fragment>

                </Box>
                <Box gridColumn="span 4">
                    <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                        {depSeatsLoading ? null : <Seats bag={oneSeatBagDep} bagCB={setBagDep} price={oneSeatPriceDep} addclbk={addDepS} rmvclbk={removeDepS} type="Departure" priceCallBack={setPriceDep} style={{ display: "inline-block" }} rows={depRows} maxReservableSeats={Number(departure.number_of_passengers)} visible />}
                    </div>
                </Box>
                <Box gridColumn="span 8">
                    <Box gridColumn="span 8">
                        <React.Fragment>
                            <CssBaseline />
                            <Container maxWidth="sm">
                                <Paper elevation={3}>
                                    <Box sx={{ bgcolor: colors.c3, height: '2vh' }} style={{ marginTop: "2%" }} />
                                    <Box sx={{ bgcolor: 'whitesmoke', height: '47vh' }} >
                                        <List
                                            sx={{
                                                width: '100%',
                                                maxWidth: 600
                                            }}
                                        >
                                            <ListItem>
                                                <ListItemText style={{ color: colors.c1 }} primary="Flight Number" secondary={ret.flight_number} />
                                                <ListItemText style={{ color: colors.c1 }} primary="From" secondary={ret.from} />
                                                <ListItemText style={{ color: colors.c1 }} primary="To" secondary={ret.to} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText style={{ color: colors.c1 }} primary="Departure Terminals" secondary={ret.departure_terminal} />
                                                <ListItemText style={{ color: colors.c1 }} primary="Arrival Terminals" secondary={ret.arrival_terminal} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText style={{ color: colors.c1 }} primary="Departure Time" secondary={ret.departure_time} />
                                                <ListItemText style={{ color: colors.c1 }} primary="Arrival Time" secondary={ret.arrival_time} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText style={{ color: colors.c1 }} primary="Seats" secondary={returnSeats} />
                                                <ListItemText style={{ color: colors.c1 }} primary="Price" secondary={priceRet} />
                                                <ListItemText style={{ color: colors.c1 }} primary="Baggage Allowance" secondary={bagRet} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Paper>

                            </Container>
                        </React.Fragment>

                    </Box>


                </Box>
                <Box gridColumn="span 4">
                    <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                        {retSeatsLoading ? null : <Seats bag={oneSeatBagRet} bagCB={setBagRet} price={oneSeatPriceRet} addclbk={addRetS} rmvclbk={removeRetS} type="Return" priceCallBack={setPriceRet} style={{ display: "inline-block" }} rows={retRows} maxReservableSeats={Number(ret.number_of_passengers)} visible />}
                    </div>
                </Box>
                <Box gridColumn="span 3">

                </Box>
                <Box gridColumn="span 5">


                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>

                        <Box gridColumn="span 2"  >
                            <Button style={{
                                borderRadius: 5,
                                backgroundColor: colors.c1,
                                marginTop: "25px",
                                marginLeft: "200%"
                            }} variant="contained" size="medium" onClick={backHandler}> back </Button>
                        </Box>
                        <Box gridColumn="span 10 " >
                            <Button style={{
                                borderRadius: 5,
                                backgroundColor: colors.c1,
                                marginTop: "25px",
                            }} variant="contained" size="medium" onClick={submitHandler}> confirm </Button>
                        </Box>
                    </Box>
                </Box>


                <Box gridColumn="span 4">
                    <SeatGuide />
                </Box>
            </Box>
            <Box sx={{ float: 'left', marginTop: -8.5, marginLeft: 28 }}>

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
                        Are you sure you want to book these seats?
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
                    resId={resId}
                    price={priceDep + priceRet}
                    depFrom={departure.from}
                    depDDay={new Date(departure.departure_time).getDate() + "/" + (new Date(departure.departure_time).getMonth() + 1) + "/" + new Date(departure.departure_time).getFullYear()}
                    depDTime={new Date(departure.departure_time).getHours() + ":" + new Date(departure.departure_time).getMinutes()}
                    depDT={departure.departure_terminal}
                    depTo={departure.to}
                    depADay={new Date(departure.arrival_time).getDate() + "/" + (new Date(departure.arrival_time).getMonth() + 1) + "/" + new Date(departure.arrival_time).getFullYear()}
                    depATime={new Date(departure.arrival_time).getHours() + ":" + new Date(departure.arrival_time).getMinutes()}
                    depAT={departure.arrival_terminal}
                    depSeats={departureSeats}
                    cabin={departure.cabin_type}
                    retFrom={ret.from}
                    retDDay={new Date(ret.departure_time).getDate() + "/" + (new Date(ret.departure_time).getMonth() + 1) + "/" + new Date(ret.departure_time).getFullYear()}
                    retDTime={new Date(ret.departure_time).getHours() + ":" + new Date(ret.departure_time).getMinutes()}
                    retDT={ret.departure_terminal}
                    retTo={ret.to}
                    retADay={new Date(ret.arrival_time).getDate() + "/" + (new Date(ret.arrival_time).getMonth() + 1) + "/" + new Date(ret.arrival_time).getFullYear()}
                    retATime={new Date(ret.arrival_time).getHours() + ":" + new Date(ret.arrival_time).getMinutes()}
                    retAT={ret.arrival_terminal}
                    retSeats={returnSeats}
                />
                <DialogActions>
                    <Button variant="outlined" onClick={reserveDone}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

