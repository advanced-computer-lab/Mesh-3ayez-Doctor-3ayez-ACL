
import '../index.css';
import im from './margo-brodowicz-KZHhnb6XsQI-unsplash.jpg'

import React from 'react'
import { FormControl } from '@mui/material';
import UserSearch from './UserSearch';
import UserSearchResults from './UserSearchResults';
import UserNavBar from './UserNavBar';

function UserHome() {
    
    return (
     <div className="searchBack" style={{ backgroundImage: `url(${im})` }} >
         <UserNavBar></UserNavBar>
         <UserSearch position="absolute"></UserSearch>
     </div>
    )
}

export default UserHome
