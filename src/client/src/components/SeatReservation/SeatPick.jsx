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
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material';
export function SeatPick() {
    const history = useHistory();
    const location = useLocation();
    const departure = location.state.departure;
    const ret = location.state.return;
    const [depSeats, setDepSeats] = useState([]);
    const [depSeatsLoading, setDepSeatsLoading] = useState(true);
    const [retSeatsLoading, setRetSeatsLoading] = useState(true);
    let depCabinType = departure.cabin_type;
    console.log("dep id: " + departure.flight_id + ", return id: " + ret.flight_id + ", cabin: " + departure.cabin_type);
    const [retSeats, setRetSeats] = useState([]);
    let retCabinType = ret.cabin_type;
    useEffect(() => {
        axios.get("http://localhost:8000/api/flights/all_seats/" + departure.flight_id + "/" + depCabinType)
            .then(res => {

                setDepSeats(res.data);
                setDepSeatsLoading(false);
                console.log(depSeats);
            })
            .catch(() => {
                console.log("BOOM");
            });
        axios.get("http://localhost:8000/api/flights/all_seats/" + ret.flight_id + "/" + retCabinType)
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
    }
    const tokenHandler = (token) => {
        // handleToken(100, token)
        reserve(token);
    }
    function reserve(token) {
        var data = {
            user_id: "61bcd1e7bf1ace92644c0287", // to be handled
            departure_flight: departure.flight_id,
            return_flight: ret.flight_id,
            number_of_passengers: Number(departure.number_of_passengers),
            cabin_type: departure.cabin_type,
            departure_seats: reservedDepSeats,
            return_seats: reservedRetSeats,
            stripeToken:token
        };
        console.log(data);
        axios.post("http://localhost:8000/api/reservations", data);
        history.go();
        console.log("done");
        setConfirm(false);
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
        <div className="App" style={{ backgroundColor: "#D4ECDD", height: "1000px" }}>
            <div style={{ height: "80px", backgroundColor: "#181D31" }}><h3 style={{ color: "whitesmoke", margin: "auto", padding: "30px" }}><strong>{head}</strong></h3></div>
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
                                <Box sx={{ bgcolor: '#F3950D', height: '2vh' }} style={{ marginTop: "2%" }} />
                                <Box sx={{ bgcolor: 'whitesmoke', height: '47vh' }} >
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 600
                                        }}
                                    >
                                        <ListItem>
                                            <ListItemText primary="Flight Number" secondary={departure.flight_number} />
                                            <ListItemText primary="From" secondary={departure.from} />
                                            <ListItemText primary="To" secondary={departure.to} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Departure Terminals" secondary={departure.departure_terminal} />
                                            <ListItemText primary="Arrival Terminals" secondary={departure.arrival_terminal} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Departure Time" secondary={departure.departure_time} />
                                            <ListItemText primary="Arrival Time" secondary={departure.arrival_terminal} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Seats" secondary={departureSeats} />
                                            <ListItemText primary="Price" secondary={priceDep} />
                                            <ListItemText primary="Baggage Allowance" secondary={bagDep} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Paper>

                        </Container>
                    </React.Fragment>

                </Box>
                <Box gridColumn="span 4">
                    <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                        {depSeatsLoading ? null : <Seats bag={oneSeatBagDep} bagCB={setBagDep} price={oneSeatPriceDep} addclbk={addDepS} rmvclbk={removeDepS} type="Departure" priceCallBack={setPriceDep} style={{ display: "inline-block" }} rows={depRows} maxReservableSeats={departure.number_of_passengers} visible />}
                    </div>
                </Box>
                <Box gridColumn="span 8">
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
                                                <ListItemText primary="Flight Number" secondary={ret.flight_number} />
                                                <ListItemText primary="From" secondary={ret.from} />
                                                <ListItemText primary="To" secondary={ret.to} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary="Departure Terminals" secondary={ret.departure_terminal} />
                                                <ListItemText primary="Arrival Terminals" secondary={ret.arrival_terminal} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary="Departure Time" secondary={ret.departure_time} />
                                                <ListItemText primary="Arrival Time" secondary={ret.arrival_time} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary="Seats" secondary={returnSeats} />
                                                <ListItemText primary="Price" secondary={priceRet} />
                                                <ListItemText primary="Baggage Allowance" secondary={bagRet} />
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
                        {retSeatsLoading ? null : <Seats bag={oneSeatBagRet} bagCB={setBagRet} price={oneSeatPriceRet} addclbk={addRetS} rmvclbk={removeRetS} type="Return" priceCallBack={setPriceRet} style={{ display: "inline-block" }} rows={retRows} maxReservableSeats={ret.number_of_passengers} visible />}
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
                    <div style={{marginRight:"1%"}}>
                        <Stripe
                            stripeKey='pk_test_51KACNtHLa29h6dWHVk2jjBX8fyb4f9blEHCnHoaLgaBJLGYNjp3UTBmBgi5EMifGmV9vfADqIwaArtgM8YwpeSl400CQ0mDxk8'
                            token={tokenHandler}
                        />
                    </div>
                    <Button variant="outlined" onClick={handleClose}>NO</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

