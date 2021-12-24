import React from 'react'
import EditFlightSearchBar from './EditFlightSearchBar';
import EditSearchResults from './EditSearchResults';
import UserSearch from './UserSearch';
import { useLocation } from "react-router-dom";

export default function EditReturnFlight() {
    const flight={from:"", to:"", numberOfPassengers:""};
    const location= useLocation();
    return (
        <div>
            <Navbar></Navbar>
            <UserSearch src='editRet'></UserSearch>
            <EditSearchResults flights={location.state.flights['return_flights']} src='editRet'></EditSearchResults>
        </div>
    )
}
