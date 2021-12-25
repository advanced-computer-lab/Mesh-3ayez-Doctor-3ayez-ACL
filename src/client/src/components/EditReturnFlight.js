import React, { useEffect } from 'react'
import EditFlightSearchBar from './EditFlightSearchBar';
import EditSearchResults from './EditSearchResults';
import UserSearch from './UserSearch';
import UserNavBar from "./UserNavBar"
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Stack from'@mui/material/Stack'
import { withStyles } from '@material-ui/core';

 function EditReturnFlight() {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const [returnFlight, setReturnFlight] = React.useState([]);

    useEffect(() => {
        if (location.state.src === 'editRet') {
            //search with all attributes except for the departure date and cabin class
            axios.get(`http://localhost:8000/api/reservations/all_possible_flights/${location.state.reservation._id}/${location.state.src}`, { "Content-Type": "application/json" }).then(
                res => {

                    setReturnFlight(res.data);
                    setLoading(false);
                }
            ).catch(err => {
                console.log(err)
            })

        } else {
            setReturnFlight(location.state.flights);
            setLoading(false);

        }
    }, [])
    const cabin=location.state.reservation.cabin_type
    const price=location.state.flight[`${cabin}_seats`].price['$numberDecimal']
    return (
        <div style={{ position: 'relative', textAlign: "center" }}>

            <Stack textAlign="center">
                <UserNavBar></UserNavBar>
                <EditFlightSearchBar src='editRet' flight={location.state.flight} number_of_passengers={location.state.reservation.number_of_passengers} res={location.state.reservation}
                depFlight={location.state.depFlight} retFlight={location.state.retFlight}></EditFlightSearchBar>
                {!loading && <EditSearchResults margin="Auto" textAlign= "center" flights={returnFlight} src='editRet' res={location.state.reservation} oldPrice={price} flight={location.state.flight}
                ></EditSearchResults>}
            </Stack>

        </div>
    )
}
export default withStyles()(EditReturnFlight);