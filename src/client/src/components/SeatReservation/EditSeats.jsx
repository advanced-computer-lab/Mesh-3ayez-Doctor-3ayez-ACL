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
import { ResItinerary } from "./ResItinerary";
import UserNavBar from "../UserNavBar";

import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material';
const colors= require("../../colors");

var dict = {};
function setDict(arr){
    for(var i=0;i<arr.length;i++){
        dict[arr[i]._id]=false;
    }
}

export default function EditSeats() {
    const history= useHistory();
    const location = useLocation();
    const reservation = location.state.reservation;
    const departure=location.state.depFlight;
    const ret=location.state.retFlight;
    const resType = location.state.type;
    const cabinType=reservation.cabin_type;
    const maxSeatsNo = location.state.seats.length;
    var oneSeatPriceDep=0;
    var oneSeatPriceRet=0;
    var oneSeatBagDep=0;
    var oneSeatBagRet=0;
    var head="";
    if (cabinType.toLowerCase() === "economy"){
        head = "Economy Class";
        oneSeatPriceDep=Number(departure.economy_seats.price['$numberDecimal']);
        oneSeatPriceRet=Number(ret.economy_seats.price['$numberDecimal']);
        oneSeatBagDep=Number(departure.economy_seats.baggage_allowance['$numberDecimal']);
        oneSeatBagRet=Number(ret.economy_seats.baggage_allowance['$numberDecimal']);
 
    }
    else if (cabinType.toLowerCase() === "business"){
        head = "Buisness Class";
        oneSeatPriceDep=Number(departure.business_seats.price['$numberDecimal']);
        oneSeatPriceRet=Number(ret.business_seats.price['$numberDecimal']);
        oneSeatBagDep=Number(departure.business_seats.baggage_allowance['$numberDecimal']);
        oneSeatBagRet=Number(ret.business_seats.baggage_allowance['$numberDecimal']);
    }
    else{
        head = "First Class";
        oneSeatPriceDep=Number(departure.first_seats.price['$numberDecimal']);
        oneSeatPriceRet=Number(ret.first_seats.price['$numberDecimal']);
        oneSeatBagDep=Number(departure.first_seats.baggage_allowance['$numberDecimal']);
        oneSeatBagRet=Number(ret.first_seats.baggage_allowance['$numberDecimal']);
    }

    const [flag,setFlag]=useState(false);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [it, setIt] = useState(false);
    const [depSeatsLoading, setDepSeatsLoading] = useState(true);
    const [retSeatsLoading, setRetSeatsLoading] = useState(true);
    const [depSeats, setDepSeats] = useState([]);
    const [retSeats, setRetSeats] = useState([]);
    const [priceDep, setPriceDep] = useState(maxSeatsNo*oneSeatPriceDep);
    const [priceRet, setPriceRet] = useState(maxSeatsNo*oneSeatPriceRet);
    const [bagDep, setBagDep] = useState(maxSeatsNo*oneSeatBagDep);
    const [bagRet, setBagRet] = useState(maxSeatsNo*oneSeatBagRet);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [reservedDepSeats, serReservedDepSeats] = useState([]);
    const [reservedRetSeats, serReservedRetSeats] = useState([]);
    const [depFlag,setDepFlag]=useState(false);
    const [retFlag,setRetFlag]=useState(false);
    useEffect(() => {
        // console.log("I entered the use state");
        axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.departure_flight + "/" + cabinType,
        {headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}})
            .then(res => {
                setDepSeats(res.data);
                setDict(res.data);
                if(!depFlag){

                    for(var i=0;i<res.data.length;i++){

                        if(res.data[i]['reservation_id']==reservation._id)
                            addDepS(res.data[i].seat_name+" ",res.data[i]._id);
                    }
                    setDepFlag(true);
                }
                setDepSeatsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.return_flight + "/" + cabinType,
        {headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}})
            .then(res => {
                // console.log(res.data);
                setRetSeats(res.data);
                
                setDict(res.data);
                if(!retFlag){

                    for(var i=0;i<res.data.length;i++){

                        if(res.data[i]['reservation_id']==reservation._id)
                            addRetS(res.data[i].seat_name+" ",res.data[i]._id);
                    }
                    setRetFlag(true);
                }
                setRetSeatsLoading(false);    
            })
            .catch(()=>{
                console.log('an error occured');
            });
    }, []);
    
    
    var depRows = [];
    buildSeatRows(depSeats, depRows);
    var retRows = [];
    buildSeatRows(retSeats, retRows);
    if(resType=='departure'){
        reFormatSeats(depRows,"dep");
    }else{
        reFormatSeats(retRows,"ret");
    }    
    function reFormatSeats(seats,type){
                for(var i=0;i<seats.length;i++){
                    for(var j=0;j<seats[i].length;j++){
                        if(seats[i][j]){
                            var seat=seats[i][j];
                            if(seat.resId){
                                // console.log("in");
                                if(seat.resId==reservation._id){ //waiting for the real res id 
                                    seat.isReserved=false;
                                    seat['isSelected']=true;
                                        // if(!flag){
                                        //     if(!dict[seat.id]){
                                        //         if(type=="dep"){
                                        //             addDepS(seat.number+" ",seat.id);

                                        //         }else{
                                        //             addRetS(seat.number+" ",seat.id);

                                        //         }
                                        //         dict[seat.id]=true;
                                        //     }
                                        //     setFlag(true);
                                        // }
                                    seats[i][j]=seat;
                                } 
                            }
                        }
                    }
                }
            
        

    }
    
    function addDepS(x, i) {
        departureSeats.push(x);
        reservedDepSeats.push(i);
        setDepartureSeats(departureSeats);
        serReservedDepSeats(reservedDepSeats);
    }
    function removeDepS(x, i) {
        console.log(x);
        console.log(departureSeats.filter((y) => x != y));
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
            var seat = { 'id': seat._id, number: seat.seat_name, isReserved: isReserved,resId:seat['reservation_id']  };
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
            var seat = { 'id': seat._id, number: seat.seat_name, isReserved: isReserved,resId:seat['reservation_id'] };
            row.push(seat);
        }
        if (row.length > 0) {
            rows.push(row);
            row = [];
        }
        
    }
    function submitHandler() {
        var editedSeats=0;
        if(resType=='departure'){
            editedSeats=reservedDepSeats.length;
        }else{
            editedSeats=reservedRetSeats.length;
        }
        if (editedSeats==maxSeatsNo) {
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
    function reserveDone(){
        handleClose();
        history.push({
            pathname: '/user/reservation',
        });
    }
    
    function updateSeats(){
        if(resType=='departure'){
                var data={seats:reservedDepSeats};
                axios.put("http://localhost:8000/api/reservations/change_seats/"+reservation._id+"/"+reservation.user_id+"/"+reservation.departure_flight,data,
                {headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}});

            }else{
            var data={seats:reservedRetSeats};
            axios.put("http://localhost:8000/api/reservations/change_seats/"+reservation._id+"/"+reservation.user_id+"/"+reservation.return_flight,data,
            {headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}});
 
            }
        setConfirm(false);
        setIt(true);

    }
    return (
        <div className="App" style={{ backgroundColor: "#FFFFFF", height: "1000px" }}>
            <UserNavBar/>

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
                                            <ListItemText style={{color:colors.c1}} primary="Flight Number" secondary={departure.flight_number} />
                                            <ListItemText style={{color:colors.c1}} primary="From" secondary={departure.from} />
                                            <ListItemText style={{color:colors.c1}} primary="To" secondary={departure.to} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText style={{color:colors.c1}} primary="Departure Terminals" secondary={departure.departure_terminal} />
                                            <ListItemText style={{color:colors.c1}} primary="Arrival Terminals" secondary={departure.arrival_terminal} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText style={{color:colors.c1}} primary="Departure Time" secondary={departure.departure_time}/>
                                            <ListItemText style={{color:colors.c1}} primary="Arrival Time" secondary={departure.arrival_time} />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText style={{color:colors.c1}} primary="Seats" secondary={departureSeats} />
                                            <ListItemText style={{color:colors.c1}} primary="Price" secondary={priceDep} />
                                            <ListItemText style={{color:colors.c1}} primary="Baggage Allowance" secondary={bagDep} />

                                        </ListItem>
                                    </List>
                                </Box>
                            </Paper>

                        </Container>
                    </React.Fragment>

                </Box>
                <Box gridColumn="span 4">
                    <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                    {depSeatsLoading?null:<Seats bag={oneSeatBagDep} price={oneSeatPriceDep} bagCB={setBagDep} priceCallBack={setPriceDep} type="Departure" rmvclbk={removeDepS} addclbk={addDepS} rows={depRows} maxReservableSeats={resType=='departure'?maxSeatsNo:0} visible />
}

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
                                                <ListItemText style={{color:colors.c1}} primary="Flight Number" secondary={ret.flight_number} />
                                                <ListItemText style={{color:colors.c1}} primary="From" secondary={ret.from} />
                                                <ListItemText style={{color:colors.c1}} primary="To" secondary={ret.to} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText style={{color:colors.c1}} primary="Departure Terminals" secondary={ret.departure_terminal} />
                                                <ListItemText style={{color:colors.c1}} primary="Arrival Terminals" secondary={ret.arrival_terminal} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText style={{color:colors.c1}} primary="Departure Time" secondary={ret.departure_time} />
                                                <ListItemText style={{color:colors.c1}} primary="Arrival Time" secondary={ret.arrival_time} />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText style={{color:colors.c1}} primary="Seats" secondary={returnSeats} />
                                                <ListItemText style={{color:colors.c1}} primary="Price" secondary={priceRet} />
                                                <ListItemText style={{color:colors.c1}} primary="Baggage Allowance" secondary={bagRet}/>

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
                   {retSeatsLoading?null:<Seats bag={oneSeatBagRet} price={oneSeatPriceRet} bagCB={setBagRet} priceCallBack={setPriceRet} type="Return" rmvclbk={removeRetS} addclbk={addRetS} rows={retRows} maxReservableSeats={resType=='return'?maxSeatsNo:0} visible />
}

                    </div>
                </Box>
                <Box gridColumn="span 3">
                </Box>
                <Box gridColumn="span 5">
                    <Button style={{
                            borderRadius: 5,
                            backgroundColor: colors.c1,
                            marginTop: "25px",
                        }} variant="contained" size="medium" onClick={submitHandler} > confirm </Button>

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
                        Oops! It seems that you did not choose your all seats.
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
                    <Button variant="outlined" onClick={updateSeats}>GO ON</Button>
                    <Button variant="outlined" onClick={handleClose}>NO</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={it}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogContent>
                    <ResItinerary />
                </DialogContent>
                <ResItinerary 
                resId={reservation._id}
                price={priceDep+priceRet}
                depFrom={departure.from}
                depDDay={new Date(departure.departure_time).getDate()+"/"+(new Date(departure.departure_time).getMonth()+1)+"/"+new Date(departure.departure_time).getFullYear()}
                depDTime={new Date(departure.departure_time).getHours()+":"+new Date(departure.departure_time).getMinutes()}                            
                depDT={departure.departure_terminal}
                depTo={departure.to}
                depADay={new Date(departure.arrival_time).getDate()+"/"+(new Date(departure.arrival_time).getMonth()+1)+"/"+new Date(departure.arrival_time).getFullYear()}
                depATime={new Date(departure.arrival_time).getHours()+":"+new Date(departure.arrival_time).getMinutes()}                            
                depAT={departure.arrival_terminal}
                depSeats={departureSeats}
                cabin={cabinType}
                retFrom={ret.from}
                retDDay={new Date(ret.departure_time).getDate()+"/"+(new Date(ret.departure_time).getMonth()+1)+"/"+new Date(ret.departure_time).getFullYear()}
                retDTime={new Date(ret.departure_time).getHours()+":"+new Date(ret.departure_time).getMinutes()}                            
                retDT={ret.departure_terminal}
                retTo={ret.to}
                retADay={new Date(ret.arrival_time).getDate()+"/"+(new Date(ret.arrival_time).getMonth()+1)+"/"+new Date(ret.arrival_time).getFullYear()}
                retATime={new Date(ret.arrival_time).getHours()+":"+new Date(ret.arrival_time).getMinutes()}                            
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

