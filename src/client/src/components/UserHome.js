
import '../index.css';
import im from './margo-brodowicz-KZHhnb6XsQI-unsplash.jpg'

import React, { useState } from 'react'
import { FormControl } from '@mui/material';
import UserSearch from './UserSearch';
import UserSearchResults from './UserSearchResults';
import UserNavBar from './UserNavBar';
import { useLocation } from 'react-router-dom';
function UserHome() {
    const location = useLocation();
    const [user, setUser]= useState(false);
    console.log(location.state.token, location.state.user);
    return (
     <div className="searchBack" style={{ backgroundImage: `url(${im})` }} >
         <UserNavBar user={true} onLogin={setUser}></UserNavBar>
         <UserSearch user={true} position="absolute"></UserSearch>
     </div>
    )
}

export default UserHome
