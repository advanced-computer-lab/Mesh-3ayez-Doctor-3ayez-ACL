import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SeatGuide from "./SeatGuide";
import Seats from "./Seats";
import axios from "axios";
import Ticket from '../Ticket_components/Ticket';
import Button from '@mui/material/Button';
import { useLocation } from "react-router";
export function SeatPick() {

    const location = useLocation();
    const departure = location.state.departure;
    const ret = location.state.return;
    const [depSeats, setDepSeats] = useState([])
    let depCabinType = departure.cabin_type;
    console.log("dep id: " + departure.flight_id + ", return id: " + ret.flight_id + ", cabin: " + departure.cabin_type);
    const [retSeats, setRetSeats] = useState();
    let retCabinType = ret.cabin_type;
    useEffect(() => {
        console.log("Nadaaa")
        axios.get("http://localhost:8000/api/flights/all_seats/" + departure.flight_id + "/" + depCabinType)
            .then(res => {
                setDepSeats(res.data);
            })
            .catch(() => {
                console.log("BOOM");
            });
        axios.get("http://localhost:8000/api/flights/all_seats/" + ret.flight_id + "/" + retCabinType)
            .then(res => {
                setRetSeats(res.data);
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
    buildSeatRows([], retRows);

    // handle price
    const [priceDep, setPriceDep] = useState(0);
    const [priceRet, setPriceRet] = useState(0);
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
    var depTcktData = {
        key: "",
        _id: "",
        flight_id: "",
        reservation_id: "",
        seat_type: "",
        seat_name: departureSeats,
        price: priceDep,
        baggage_allowance: "",
        flight_details: [{seat_type:"economy",economy_seats:{price:125,baggage_allowance:125}}]
    };

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
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8}>
                        <Ticket getRows={[depTcktData]} />
                    </Grid>
                    <Grid item xs={4}>

                        <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                            <Seats addclbk={addDepS} rmvclbk={removeDepS} type="Departure" priceCallBack={setPriceDep} style={{ display: "inline-block" }} rows={depRows} maxReservableSeats={departure.number_of_passengers} visible />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8}>
                        <Ticket getRows={[depTcktData]} />
                    </Grid>
                    <Grid item xs={4}>

                        <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                            <Seats addclbk={addRetS} rmvclbk={removeRetS} type="Return" priceCallBack={setPriceRet} style={{ display: "inline-block" }} rows={retRows} maxReservableSeats={ret.number_of_passengers} visible />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8}>
                        <Grid item xs={12} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={10}></Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" size="medium"> confirm </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <SeatGuide />
                    </Grid>
                </Grid>
            </Grid>
        </div>



    );
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