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
var flag=false;
export default function EditSeats() {
    
    const history= useHistory();
    const location = useLocation();
    const reservation = location.state.reservation;
    const resType = location.state.type;
    const cabinType=reservation.cabin_type;

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
    

    useEffect(() => {
        console.log("I entered the use state");
        axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.departure_flight + "/" + cabinType)
            .then(res => {
                
                setDepSeats(res.data);
                setDepSeatsLoading(false);
                console.log(depSeatsLoading);
                console.log(depSeats); 
                
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("http://localhost:8000/api/flights/all_seats/" + reservation.return_flight + "/" + cabinType)
            .then(res => {
                setRetSeats(res.data);
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
                        if(seat.resId==reservation._id){ //waiting for the real res id 
                            seat.isReserved=false;
                            seat['isSelected']=true;
                            if(!flag){
                                if(type=="dep"){
                                    console.log("wait");
                                    departureSeats.push(seats.number);
                                    reservedDepSeats.push(seats.id);
                                    setDepartureSeats(departureSeats);
                                    serReservedDepSeats(reservedDepSeats);
                                    console.log(reservedDepSeats);
                                }else{
                                    returnSeats.push(seats.number);
                                    reservedRetSeats.push(seats.id);
                                    setReturnSeats(returnSeats);
                                    serReservedRetSeats(reservedRetSeats);
                                }
                            }
                            seats[i][j]=seat;
                        } 
                    }
                }
            }
        }
        flag=true;
    }
    
    function addDepS(x, i) {
        departureSeats.push(x);
        reservedDepSeats.push(i);
        setDepartureSeats(departureSeats);
        serReservedDepSeats(reservedDepSeats);
        console.log("Added");
        console.log(departureSeats);
        console.log(reservedDepSeats);
        console.log("done");
    }
    function removeDepS(x, i) {

        setDepartureSeats(departureSeats.filter((y) => x != y));
        serReservedDepSeats(reservedDepSeats.filter((j) => j != i));
        console.log("removed");
        console.log(departureSeats);
        console.log(reservedDepSeats);
        console.log("done");
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
            var seat = { 'id': seat._id, number: seat.seat_name, isReserved: isReserved,resId:seat['reservation_id'] };
            row.push(seat);
            
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
    
    function updateSeats(){

    }
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
                                            <ListItemText primary="Flight Number"  />
                                            <ListItemText primary="From"  />
                                            <ListItemText primary="To"  />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Departure Terminals"  />
                                            <ListItemText primary="Arrival Terminals"/>
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Departure Time" />
                                            <ListItemText primary="Arrival Time"  />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem>
                                            <ListItemText primary="Seats" />
                                            <ListItemText primary="Price"  />
                                            <ListItemText primary="Baggage Allowance" />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Paper>

                        </Container>
                    </React.Fragment>

                </Box>
                <Box gridColumn="span 4">
                    <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                    {depSeatsLoading?null:<Seats bagCB={setBagDep} priceCallBack={setPriceDep} rmvclbk={removeDepS} addclbk={addDepS} rows={depRows} maxReservableSeats={2} visible />
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
                                                <ListItemText primary="Flight Number" />
                                                <ListItemText primary="From"  />
                                                <ListItemText primary="To"  />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary="Departure Terminals"  />
                                                <ListItemText primary="Arrival Terminals" />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary="Departure Time"/>
                                                <ListItemText primary="Arrival Time"  />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText primary="Seats"  />
                                                <ListItemText primary="Price"  />
                                                <ListItemText primary="Baggage Allowance" />
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
                   {retSeatsLoading?null:<Seats bagCB={setBagRet} priceCallBack={setPriceRet} rmvclbk={removeRetS} addclbk={addRetS} rows={retRows} maxReservableSeats={3} visible />
}
                    </div>
                </Box>
                <Box gridColumn="span 3">
                </Box>
                <Box gridColumn="span 5">
                    <Button variant="contained" size="medium" onClick={updateSeats} > confirm </Button>

                </Box>
                <Box gridColumn="span 4">
                <SeatGuide />
                </Box>
            </Box>
            
        </div>
    );
    // return(<h1>Omar</h1>)
}

