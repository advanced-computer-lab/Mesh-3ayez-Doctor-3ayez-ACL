import React from 'react'
import FlightCard from './FlightCard'
import { useState } from 'react';
import { Typography } from '@mui/material';
// import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router';
function SearchResultsList(props) {
    // const { flights } = useSelector((state) => state.flightSearch)
    console.log(props.flights['departure_flights']);
    const [retrunF, setReturn] = useState(false);
    const [departureReserved, setDepartureReserved] = useState({});
    const [returnReserved, setReturnReserved] = useState({});
    const history= useHistory();

    const onClick = (reserved) => {
        setReturn(true);
        setDepartureReserved(reserved);
    }
    const onClickReturn = (reserved) => {

        setReturnReserved(reserved);
        history.push({
            pathname:'/user/seatReservation',
            state: {
                departure: departureReserved,
                return: returnReserved
            }
        });
    }
    console.log(retrunF);
    console.log(departureReserved)
    console.log(returnReserved)

    return (

        <Stack margin="auto" textAlign='center' spacing={2}>
            {retrunF == false && <Typography>{props.flights['departure_flights'].length == 0 ? "No departure flights" : "Choose your departure flight"}</Typography>}
            {retrunF == true && <Typography>{props.flights['return_flights'].length == 0 ? "No return flights" : "Choose your return flight"}</Typography>}

            {/* {flights['departure_flights'].length == 0 && <h1>Empty list</h1>} */}
            {(retrunF == false) &&
                props.flights['departure_flights'].map((item) => {
                    const d= (new Date(item.arrival_time)-new Date(item.arrival_time))/(1000*60*60);
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

            {(retrunF == true) &&
                props.flights['return_flights'].map((item) => {
                    console.log((item[`${props.cabin_type}_seats`].baggage_allowance['$numberDecimal']))
                    return (
                        <FlightCard flight_number={item.flight_number}
                            key={item._id}
                            flight_id={item._id}
                            from={item.from}
                            to={item.to}
                            arrival_time={item.arrival_time}
                            departure_time={item.departure_time}
                            duration={2}
                            cabin_type={props.cabin_type}
                            baggage={item[`${props.cabin_type}_seats`].baggage_allowance['$numberDecimal']}
                            price={item[`${props.cabin_type}_seats`].price['$numberDecimal']}
                            onClick={onClickReturn}

                        >

                        </FlightCard>
                    )
                })

            }
        </Stack>
    )
}

export default SearchResultsList
