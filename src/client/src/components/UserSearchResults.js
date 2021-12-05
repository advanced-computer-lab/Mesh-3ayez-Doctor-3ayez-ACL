import React from 'react'
import UserSearch from './UserSearch'
import UserNavBar from './UserNavBar'
import SearchResultsList from './SearchResultsList';
import {useEffect,useState} from 'react' 
import { useLocation } from "react-router-dom";
import Stack from '@mui/material/Stack'
import Navbar from './Navbar';
import SearchResultsTmp from './SearchResultsTmp';
function UserSearchResults() {
    const location= useLocation();
    const [user, setUser]= useState(location.state.user);
    function setU(){
        setUser(true);
    }
    return (
        <div style={{position:'relative',textAlign:"center"}}>
            {/* <UserNavBar></UserNavBar> */}
            <Stack textAlign="center">
            <UserNavBar user={user} onLogin={setU}></UserNavBar>
            <UserSearch></UserSearch>
            <SearchResultsTmp margin="Auto" textAlign= "center" flights={location.state.flights} user={user} cabin_type={location.state.cabin_type} number_of_passengers={location.state.number_of_passengers}></SearchResultsTmp>
            </Stack>
        </div>
    )
}

export default UserSearchResults
