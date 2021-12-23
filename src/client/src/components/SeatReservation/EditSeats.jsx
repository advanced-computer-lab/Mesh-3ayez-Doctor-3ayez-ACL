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
import SeatPick from '../SeatPick';

import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material';
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
    const [flag,setFlag]=useState(false);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [depSeatsLoading, setDepSeatsLoading] = useState(true);
    const [retSeatsLoading, setRetSeatsLoading] = useState(true);
    const [depSeats, setDepSeats] = useState([]);
    const [retSeats, setRetSeats] = useState([]);
    const [priceDep, setPriceDep] = useState(0);
    const [priceRet, setPriceRet] = useState(0);
    const [bagDep, setBagDep] = useState(0);
    const [bagRet, setBagRet] = useState(0);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [reservedDepSeats, serReservedDepSeats] = useState([]);
    const [reservedRetSeats, serReservedRetSeats] = useState([]);
    var oneSeatPriceDep=50;
    var oneSeatPriceRet=ret.price;
    var oneSeatBagDep=90;
    var oneSeatBagRet=ret.baggage;
    

    useEffect(() => {
        // console.log("I entered the use state");
        axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.departure_flight + "/" + cabinType)
            .then(res => {
                setDepSeats(res.data);
                setDict(res.data);
                setDepSeatsLoading(false);
                
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.return_flight + "/" + cabinType)
            .then(res => {
                // console.log(res.data);
                setRetSeats(res.data);
                setDict(res.data);

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
                                        if(!flag){
                                            if(!dict[seat.id]){
                                                if(type=="dep"){
                                                    addDepS(seat.number+" ",seat.id);

                                                }else{
                                                    addRetS(seat.number+" ",seat.id);
                                                }
                                                dict[seat.id]=true;
                                            }
                                            setFlag(true);
                                        }
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
    
    const [X,setX]=useState(0); 
    function foo  (x,i){
        console.log(x);
    }
    
    var head="Omar";
    

    // // var depRows = [];
    // // buildSeatRows(depSeats, depRows);
    // // var retRows = [];
    // // buildSeatRows(retSeats, retRows);

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
            if(i%1==0&&i!=0&&i%3!=0)
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
    }
    
    function updateSeats(){
        if(resType=='departure'){
                var data={seats:reservedDepSeats};
                axios.put("http://localhost:8000/api/reservations/change_seats/"+reservation._id+"/"+reservation.user_id+"/"+reservation.departure_flight,data);

            }else{
            var data={seats:reservedRetSeats};
            axios.put("http://localhost:8000/api/reservations/change_seats/"+reservation._id+"/"+reservation.user_id+"/"+reservation.return_flight,data);
 
            }
        setConfirm(false);
    }
    return (
        <div className="App" style={{ backgroundColor: "#D4ECDD", height: "1000px" }}>
            <div style={{ height: "80px", backgroundColor: "#181D31" }}><h3 style={{ color: "whitesmoke", margin: "auto", padding: "30px" }}><strong>{head}</strong></h3></div>
           
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
                                            <ListItemText primary="Departure Time" secondary={departure.departure_time}/>
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
                    {depSeatsLoading?null:<Seats bag={oneSeatBagDep} price={oneSeatPriceDep} bagCB={setBagDep} priceCallBack={setPriceDep} rmvclbk={removeDepS} addclbk={addDepS} rows={depRows} maxReservableSeats={resType=='departure'?maxSeatsNo:0} visible />
}
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
                                                <ListItemText primary="Baggage Allowance" secondary={bagRet}/>
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
                   {retSeatsLoading?null:<Seats bag={oneSeatBagRet} price={oneSeatPriceRet} bagCB={setBagRet} priceCallBack={setPriceRet} rmvclbk={removeRetS} addclbk={addRetS} rows={retRows} maxReservableSeats={resType=='return'?maxSeatsNo:0} visible />
}
                    </div>
                </Box>
                <Box gridColumn="span 3">
                </Box>
                <Box gridColumn="span 5">
                    <Button variant="contained" size="medium" onClick={submitHandler} > confirm </Button>
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
            
        </div>
    );
    // return(<h1>Omar</h1>)
}

