import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack} from '@mui/material';
import FlightCard from './FlightCard'
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { withStyles } from '@mui/styles';
const colors = require("../colors.js");

function EditSearchResults(props) {
    const [reserved, setReserved] = useState({});
    const [confirm, setConfirm] = useState(false);
    const history = useHistory();
    const location= useLocation();
    function submitHandler(reserved) {
        setReserved(reserved);
        setConfirm(true);
    }
    function handleClose() {
        setConfirm(false);
    }

    const onClick = () => {
        console.log(reserved);
        history.push({
            pathname: '/user/seatReservation',
            state: {
                reserved: reserved,
                return: props.src==='editRet',
                departure: props.src==='editDep',
                departure_id:location.state.reservation.departure_flight,
                return_id:location.state.reservation.return_flight,

            }
        });
    }

    return (
        <div>
         <Box sx={{ width: '1200px' }} margin="auto" textAlign='center' >

            <Stack sx={{ mt: 2, mb: 1 }} margin="auto" textAlign='center' spacing={2}>
                {props.flights.length==0&&<Typography color={colors.c1}>No available flights </Typography>}
                {props.flights.length>0&&props.flights.map((item) => {
                    const d1 = (new Date(item.arrival_time) - new Date(item.departure_time)) / (1000);
                    const d= `${parseInt(d1/3600)}h ${parseInt((d1%3600)/60)}m`
                    const n=props.res.number_of_passengers
                    const newPrice= item[`${props.res.cabin_type}_seats`].price['$numberDecimal'];
                    const priceDiff=n*newPrice-n*props.oldPrice;
                    console.log(props.oldPrice);
                    console.log(newPrice);
                    return (
                        <FlightCard 
                            flight_number={item.flight_number}
                            key={item._id}
                            flight_id={item._id}
                            from={item.from}
                            to={item.to}
                            arrival_time={item.arrival_time}
                            departure_time={item.departure_time}
                            number_of_passengers={props.res.number_of_passengers}
                            duration={d}
                            cabin_type={props.res.cabin_type}
                            baggage={item[`${props.res.cabin_type}_seats`].baggage_allowance['$numberDecimal']}
                            price={priceDiff>0?("+"+priceDiff):(priceDiff)}
                            onClick={submitHandler}
                            arrival_terminal={item.arrival_terminal}
                            departure_terminal={item.departure_terminal}

                        >

                        </FlightCard>)
                })
                }
            </Stack>
            <Dialog
                open={confirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to book this flights?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClick}>GO ON</Button>
                    <Button variant="outlined" onClick={handleClose}>NO</Button>
                </DialogActions>
            </Dialog>
            </Box>
        </div>
    )
}

export default withStyles() (EditSearchResults);
