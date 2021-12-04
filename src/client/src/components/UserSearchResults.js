import React from 'react'
import UserSearch from './UserSearch'
import UserNavBar from './UserNavBar'
import SearchResultsList from './SearchResultsList';
import {useEffect,useState} from 'react' 
import { useLocation } from "react-router-dom";
import Stack from '@mui/material/Stack'
import Navbar from './Navbar';
function UserSearchResults() {
    const location= useLocation();
    return (
        <div style={{position:'relative',textAlign:"center"}}>
            {/* <UserNavBar></UserNavBar> */}
            <Stack textAlign="center">
            <UserNavBar></UserNavBar>
            <UserSearch></UserSearch>
            <SearchResultsList margin="Auto" textAlign= "center" flights={location.state.flights} cabin_type={location.state.cabin_type} number_of_passengers={location.state.number_of_passengers}></SearchResultsList>
            </Stack>
        </div>
    )
}

export default UserSearchResults
