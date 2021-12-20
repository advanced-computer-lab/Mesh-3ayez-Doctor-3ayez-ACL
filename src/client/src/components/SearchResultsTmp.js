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
const steps = ['Pick departure flight', 'Pick return flight'];

export default function SearchResultsTmp(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setReturnReserved({});
        setDepartureReserved({});
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const [retrunF, setReturn] = useState(false);
    const [departureReserved, setDepartureReserved] = useState({});
    const [returnReserved, setReturnReserved] = useState({});
    const history = useHistory();

    const onClick = (reserved) => {
        setDepartureReserved(reserved);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const onClickReturn = (reserved) => {
        console.log("entered")


        setReturnReserved(reserved);     
        console.log(reserved.cabin_type)


        history.push({
            pathname: '/user/seatReservation',
            state: {
                departure: departureReserved,
                return: reserved
            }
        });
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
            {activeStep === steps.length-1 ? (
                <React.Fragment>
                    <Stack sx={{ mt: 2, mb: 1 }}  margin="auto" textAlign='center' spacing={2}>

                        {props.flights['return_flights'].map((item) => {
                            const d = (new Date(item.arrival_time) - new Date(item.departure_time)) / (1000 * 60 * 60);
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
                                    price={item[`${props.cabin_type}_seats`].price['$numberDecimal']}
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
                            color="inherit"
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
                    
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Stack sx={{ mt: 2, mb: 1 }}  margin="auto" textAlign='center' spacing={2}>
                        {props.flights['departure_flights'].map((item) => {
                            const d = (new Date(item.arrival_time) - new Date(item.departure_time)) / (1000 * 60 * 60);
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
                                    price={item[`${props.cabin_type}_seats`].price['$numberDecimal']}

                                    onClick={onClick}

                                >

                                </FlightCard>
                            )
                        })

                        }
                    </Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0&& props.flights['departure_flights'].length>0}
                            href="/"
                            sx={{ mr: 1 }}
                        >
                            {props.flights['departure_flights'].length>0?"Back":"Home"}
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
