import React, { useState } from 'react'
import EditFlightSearchBar from './EditFlightSearchBar';
import EditSearchResults from './EditSearchResults';
import UserSearch from './UserSearch';
import { useLocation } from "react-router-dom";
import UserNavBar from './UserNavBar';
import { useEffect } from 'react';
import axios from 'axios';
import Stack from'@mui/material/Stack'
import { withStyles } from '@material-ui/core';
import EditReturnFlight from './EditReturnFlight';

function EditDepartureFlight() {

    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const [departureFlight, setDepartureFlight] = React.useState([]);
    useEffect(() => {
        if (location.state.src === 'editDep') {
            let config = {
                headers: {
                    'authentication-token': localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
              }
            axios.get(`http://localhost:8000/api/reservations/all_possible_flights/${location.state.reservation._id}/${location.state.src}`, config).then(
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
    const cabin=location.state.reservation.cabin_type
    const price=location.state.flight[`${cabin}_seats`].price['$numberDecimal']
    return (
        <div style={{position:'relative',textAlign:"center"}}>
          
            <Stack textAlign="center">

                <UserNavBar></UserNavBar>
                <EditFlightSearchBar src='editDep' flight={location.state.flight} number_of_passengers={location.state.reservation.number_of_passengers} res={location.state.reservation}
                depFlight={location.state.depFlight} retFlight={location.state.retFlight}></EditFlightSearchBar>
                {!loading && 
                <EditSearchResults  margin="Auto" textAlign= "center" flights={departureFlight} src='editDep' 
                res={location.state.reservation} oldPrice={price} flight={location.state.flight}>
                </EditSearchResults>
                }
            </Stack>
        </div>
    )
}

export default (EditDepartureFlight);