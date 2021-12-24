import Dashboard from './Dashboard_components/Dashboard';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import SearchFlights from './SearchFlights';
import { Button, FormLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import PersistentDrawerRight from './PersistentDrawerRight';
import Ticket from './Ticket_components/Ticket';
import ReservationAccordion from './ReservationAccordion';
import FlightDisplay from './Ticket_components/FlightDisplay';
import Box from '@mui/material/Box';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { textAlign } from '@mui/system';
import { unstable_getScrollbarSize } from '@mui/utils';
import { Redirect, useHistory } from 'react-router';
import UserNavBar from './UserNavBar';
import { withStyles } from '@mui/styles';
import Payment from './Payment';





function Itinerary() {
    localStorage.getItem("activeStep") && localStorage.removeItem("activeStep");
    localStorage.getItem("departureReserved") && localStorage.removeItem("departureReserved");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [rsvids, setrsvids] = useState([]);
    const [thersv, setTheRsv] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [width, setWidth] = useState("0");
    const [marginLeft, setMarginLeft] = useState("0");
    const [paddingLeft, setPaddingLeft] = useState("100px");
    const [paddingRight, setPaddingRight] = useState("100px");
    const [useless, setUseless] = useState(0);
    var theflightdisplay;

    useEffect(() => {
        var tinyjsons = []
        var tinyjsons2 = []
        if (isLoading) {
            axios.get("http://localhost:8000/api/flights/user/61bcd1e7bf1ace92644c0287")
                .then(res => {
                    setrsvids(res.data);
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                });
        }







    }, []);

    let history = useHistory();


    function handleClose() {
        setOpen(false);
    }

    function handleClose2() {
        setOpen2(false);
    }

    function openCancellation(rsvid) {
        setOpen(true);
        setTheRsv(rsvid);
    }

    function openPayment(rsvid) {
        setOpen2(true);
    }

    function handleCancellation() {
        axios.delete("http://localhost:8000/api/users/reservation/61bcd1e7bf1ace92644c0287/" + thersv);
        handleClose();
        history.go();
    }



    return (
        <div >
            <UserNavBar ></UserNavBar>

            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <div>
                <div id="main" style={{ marginLeft: marginLeft, paddingLeft: paddingLeft, paddingRight: paddingRight }}>

                    {rsvids.map((thing, index) => {

                        return (thing == undefined ? null : <ReservationAccordion
                            key={index + "PP"}
                            reservation={thing}
                            delete_callback={openCancellation}
                            payment_callback={openPayment}
                        />
                        )
                    })}








                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" >
                    {"Are you sure you want to cancel your reservation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirm to cancel your reservation for both departure and return flights.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancellation} autoFocus>
                        Cancel Reservation
                    </Button>
                    <Button variant="outlined" onClick={handleClose} >Do Not Cancel Reservation</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Payment
                        name=""
                        price="5000"
                        productby="Tijwal"
                    >

                    </Payment>
                </DialogContent>
            </Dialog>


        </div>
    );


}

export default withStyles()(Itinerary);
