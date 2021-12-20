import React from 'react'
import EditFlightSearchBar from './EditFlightSearchBar';
import EditSearchResults from './EditSearchResults';
import UserSearch from './UserSearch';
import { useLocation } from "react-router-dom";

export default function EditDepartureFlight() {
    const flight={from:"", to:"", numberOfPassengers:""};
    const location= useLocation();

    return (
        <div>
            <Navbar></Navbar>
            <UserSearch src='editDep'></UserSearch>
            <EditSearchResults flights={location.state.flights['departure_flights']} src='editDep'></EditSearchResults>
        </div>
    )
}
