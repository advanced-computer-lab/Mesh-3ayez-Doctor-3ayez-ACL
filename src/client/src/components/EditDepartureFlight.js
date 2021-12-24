import React, { useState } from 'react'
import EditFlightSearchBar from './EditFlightSearchBar';
import EditSearchResults from './EditSearchResults';
import UserSearch from './UserSearch';
import { useLocation } from "react-router-dom";
import UserNavBar from './UserNavBar';
import { useEffect } from 'react';
import axios from 'axios';
import Stack from'@mui/material/Stack'
import { withStyles } from '@mui/styles';
import EditReturnFlight from './EditReturnFlight';

function EditDepartureFlight() {

    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const [departureFlight, setDepartureFlight] = React.useState([]);
    useEffect(() => {
        if (location.state.src === 'editDep') {

            axios.get(`http://localhost:8000/api/reservations/all_possible_flights/${location.state.reservation._id}/${location.state.src}`, { "Content-Type": "application/json" }).then(
                res => {
                    setDepartureFlight(res.data);
                    setLoading(false);
                }
            ).catch(err => {
                console.log(err)
            });


        } else {
            //use the original search from the seach bar
            setDepartureFlight(location.state.flights);
            setLoading(false);

        }
    }, [])
    //search with all attributes except for the departure date and cabin class

    return (
        <div style={{position:'relative',textAlign:"center"}}>

            <Stack textAlign="center">

                <UserNavBar></UserNavBar>
                <EditFlightSearchBar src='editDep' flight={location.state.flight} number_of_passengers={location.state.reservation.number_of_passengers} res={location.state.reservation}></EditFlightSearchBar>
                {!loading && <EditSearchResults  margin="Auto" textAlign= "center" flights={departureFlight} src='editDep' res={location.state.reservation}></EditSearchResults>}
            </Stack>
        </div>
    )
}

export default withStyles()(EditDepartureFlight);