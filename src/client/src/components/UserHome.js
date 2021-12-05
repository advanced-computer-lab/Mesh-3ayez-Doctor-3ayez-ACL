
import '../index.css';
import im from './margo-brodowicz-KZHhnb6XsQI-unsplash.jpg'

import React, { useState } from 'react'
import { FormControl } from '@mui/material';
import UserSearch from './UserSearch';
import UserSearchResults from './UserSearchResults';
import UserNavBar from './UserNavBar';

function UserHome() {
    const [user, setUser]= useState(false);
    function setU(){
        setUser(true);
    }
    return (
     <div className="searchBack" style={{ backgroundImage: `url(${im})` }} >
         <UserNavBar user={user} onLogin={setU}></UserNavBar>
         <UserSearch user={user} position="absolute"></UserSearch>
     </div>
    )
}

export default UserHome
