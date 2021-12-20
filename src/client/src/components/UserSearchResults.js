import React from 'react'
import UserSearch from './UserSearch'
import UserNavBar from './UserNavBar'
import {useEffect,useState} from 'react' 
import { useLocation } from "react-router-dom";
import Stack from '@mui/material/Stack'
import Navbar from './Navbar';
import SearchResultsTmp from './SearchResultsTmp';
function UserSearchResults() {
    const location= useLocation();
    return (
        <div style={{position:'relative',textAlign:"center"}}>
            {/* <UserNavBar></UserNavBar> */}
            <Stack textAlign="center">
            <UserNavBar></UserNavBar>
            <UserSearch></UserSearch>
            <SearchResultsTmp margin="Auto" textAlign= "center" flights={location.state.flights} user={location.state.user} cabin_type={location.state.cabin_type} number_of_passengers={location.state.number_of_passengers}></SearchResultsTmp>
            </Stack>
        </div>
    )
}

export default UserSearchResults
