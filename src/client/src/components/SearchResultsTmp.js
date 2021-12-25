import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import FlightCard from './FlightCard'
import { useState } from 'react';
import { useHistory } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Login from './Login';
import Signup from './Signup';

const steps = ['Pick departure flight', 'Pick return flight'];
const colors = require("../colors")
export default function SearchResultsTmp(props) {
    console.log(localStorage);

    const [activeStep, setActiveStep] = React.useState(localStorage.getItem("activeStep") ? parseInt(localStorage.getItem("activeStep")) : 0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [openLog, setOpenLog] = useState(false);
    const [openSign, setOpenSign] = useState(false);
    const [retrunF, setReturn] = useState(false);
    const [departureReserved, setDepartureReserved] = useState({});
    const [returnReserved, setReturnReserved] = useState({});

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleBack = () => {
        setReturnReserved({});
        setDepartureReserved({});
        setActiveStep(0);
        localStorage.setItem("activeStep", 0);
        localStorage.removeItem("departureReserved");
    };

    function handleCloseLog() {
        setOpenLog(false);
        console.log(JSON.parse(localStorage.getItem("departureReserved")))
        console.log(returnReserved)

        history.push({
            pathname: '/user/ReserveSeats',
            state: {
                departure: JSON.parse(localStorage.getItem("departureReserved")),
                return: returnReserved
            }
        });
        localStorage.removeItem("activeStep");
        localStorage.removeItem("departureReserved");
    }
    function handleCloseSign() {
        setOpenSign(false);
        console.log(JSON.parse(localStorage.getItem("departureReserved")))
        console.log(returnReserved)

        history.push({
            pathname: '/user/ReserveSeats',
            state: {
                departure: JSON.parse(localStorage.getItem("departureReserved")),
                return: returnReserved
            }
        });
        localStorage.removeItem("activeStep");
        localStorage.removeItem("departureReserved");
    }
    function handleClickLog() {
        setOpenLog(true);
        setOpenSign(false);
        
    }
    function handleClickSign() {
        setOpenSign(true);
        setOpenLog(false);
    }

    const history = useHistory();

    const onClick = (reserved) => {
        setDepartureReserved(reserved);
        localStorage.setItem("activeStep", 1);
        setActiveStep(1);
        console.log(activeStep)
        localStorage.setItem("departureReserved", JSON.stringify(reserved));


    }
    const onClickReturn = (reserved) => {
        setReturnReserved(reserved);

        if (!localStorage.getItem("token")) {
            console.log("nadouda")
            setOpenLog(true);
        } else {
            history.push({
                pathname: '/user/ReserveSeats',
                state: {
                    departure: JSON.parse(localStorage.getItem("departureReserved")),
                    return: reserved
                }
            });
            localStorage.removeItem("activeStep");
            localStorage.removeItem("departureReserved");
        }

    }

    return (
        <Box sx={{ width: '1200px' }} margin="auto" textAlign='center' >
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length - 1 ? (
                <React.Fragment>
                    <Stack sx={{ mt: 2, mb: 1 }} margin="auto" textAlign='center' spacing={2}>

                        {props.flights['return_flights'].map((item) => {
                            const d1 = (new Date(item.arrival_time) - new Date(item.departure_time)) / (1000);
                            const d = `${parseInt(d1 / 3600)}h ${parseInt((d1 % 3600) / 60)}m`
                            return (
                                <FlightCard flight_number={item.flight_number}
                                    key={item._id}
                                    flight_id={item._id}
                                    from={item.from}
                                    to={item.to}
                                    arrival_time={item.arrival_time}
                                    departure_time={item.departure_time}
                                    number_of_passengers={props.number_of_passengers}
                                    duration={d}
                                    cabin_type={props.cabin_type}
                                    number_of_passengers={props.number_of_passengers}
                                    baggage={item[`${props.cabin_type}_seats`].baggage_allowance['$numberDecimal']}
                                    price={item[`${props.cabin_type}_seats`].price['$numberDecimal'] * props.number_of_passengers}
                                    onClick={onClickReturn}
                                    arrival_terminal={item.arrival_terminal}
                                    departure_terminal={item.departure_terminal}

                                >

                                </FlightCard>)
                        })
                        }
                    </Stack>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            style={{
                                color: activeStep === 0 ? colors.c3 : colors.c1
                            }}
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        {/* <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button> */}
                    </Box>
                    <Dialog
                        open={openLog}
                        onClose={handleCloseLog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            {/* <DialogContentText id="alert-dialog-description">
                    </DialogContentText> */}
                        </DialogContent>
                        <DialogActions>
                            <Login signClick={handleClickSign} handleClose={handleCloseLog}></Login>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openSign}
                        onClose={handleCloseSign}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            {/* <DialogContentText id="alert-dialog-description">
                    </DialogContentText> */}
                        </DialogContent>
                        <DialogActions>
                            <Signup logClick={handleClickLog} handleClose={handleCloseSign}></Signup>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Stack sx={{ mt: 2, mb: 1 }} margin="auto" textAlign='center' spacing={2}>
                        {props.flights['departure_flights'].map((item) => {
                            const d1 = (new Date(item.arrival_time) - new Date(item.departure_time)) / (1000);
                            const d = `${parseInt(d1 / 3600)}h ${parseInt((d1 % 3600) / 60)}m`
                            return (
                                <FlightCard
                                    flight_number={item.flight_number}
                                    key={item._id}
                                    flight_id={item._id}
                                    from={item.from}
                                    to={item.to}
                                    arrival_time={item.arrival_time}
                                    departure_time={item.departure_time}
                                    arrival_terminal={item.arrival_terminal}
                                    departure_terminal={item.departure_terminal}
                                    duration={d}
                                    cabin_type={props.cabin_type}
                                    number_of_passengers={props.number_of_passengers}
                                    baggage={item[`${props.cabin_type}_seats`].baggage_allowance['$numberDecimal']}
                                    price={item[`${props.cabin_type}_seats`].price['$numberDecimal'] * props.number_of_passengers}

                                    onClick={onClick}

                                >

                                </FlightCard>
                            )
                        })

                        }
                    </Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            style={{
                                color: colors.c1
                            }}
                            disabled={activeStep === 0 && props.flights['departure_flights'].length > 0}
                            href="/"
                            sx={{ mr: 1 }}
                        >
                            {props.flights['departure_flights'].length > 0 ? "Back" : "Home"}
                        </Button>
                        {/* <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button> */}
                    </Box>

                </React.Fragment>
            )}
        </Box>
    );
}
