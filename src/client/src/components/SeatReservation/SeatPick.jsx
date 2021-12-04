import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SeatGuide from "./SeatGuide";
import Seats from "./Seats";
import axios from "axios";
import Ticket from '../Ticket_components/Ticket';
import Button from '@mui/material/Button';
export function SeatPick() {


    let depSeats;
    let depCabinType;
    axios.get("http://localhost:8000/api/flights/all_seats/" + id + "/" + depCabinType)
        .then(res => {
            depSeats = res.data;
        });
    let retSeats;
    let retCabinType;
    axios.get("http://localhost:8000/api/flights/all_seats/" + id + "/" + retCabinType)
        .then(res => {
            retSeats = res.data;
        });

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
    }));
    const [priceDep, setPriceDep] = useState(0);
    const [priceRet, setPriceRet] = useState(0);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);

    function addDepS(x) {
        departureSeats.push(x);
        setDepartureSeats(departureSeats);
    }
    function removeDepS(x) {

        setDepartureSeats(departureSeats.filter((y) => x != y));
    }
    function addRetS(x) {
        returnSeats.push(x);
        setReturnSeats(returnSeats);
    }
    function removeRetS(x) {

        setReturnSeats(returnSeats.filter((y) => x != y));
    }


    var cabin = "Economy";
    var head = "";
    if (cabin === "Economy")
        head = "Economy Class";
    else if (cabin === "Business")
        head = "Buisness Class";
    else
        head = "First Class";
    let rows = [[{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
        , [{ number: "A" }, { number: "B" }, null, { number: "C" }, { number: "D" }]
    ];
    var id = 100;
    var rows2 = [rows[0], rows[1], rows[1]];
    for (var i = 0; i < rows2.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
            if (rows[i][j] != null)
                (rows[i][j])['id'] = id++;
        }
    }
    id = 1;
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
            if (rows[i][j] != null) {
                (rows[i][j])['id'] = id++;
            }
        }
    }
    return (
        <div className="App" style={{ backgroundColor: "#D4ECDD", height: "1000px" }}>
            <div style={{ height: "80px", backgroundColor: "#181D31" }}><h3 style={{ color: "whitesmoke", margin: "auto", padding: "30px" }}><strong>{head}</strong></h3></div>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8}>
                        <Ticket getRows={[]} />
                    </Grid>
                    <Grid item xs={4}>

                        <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                            <Seats addclbk={addDepS} rmvclbk={removeDepS} type="Departure" priceCallBack={setPriceDep} style={{ display: "inline-block" }} rows={rows2} maxReservableSeats={3} visible />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={8}>
                        <Ticket getRows={[]} />
                    </Grid>
                    <Grid item xs={4}>

                        <div style={{ boxShadow: "2px 3px #999999", borderRadius: "7%", backgroundColor: "whitesmoke", padding: "30px 20px 20px 10px", display: "inline-block" }}>
                            <Seats addclbk={addRetS} rmvclbk={removeRetS} type="Return" priceCallBack={setPriceRet} style={{ display: "inline-block" }} rows={rows} maxReservableSeats={3} visible />
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