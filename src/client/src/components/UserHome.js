
import '../index.css';
import im from './margo-brodowicz-KZHhnb6XsQI-unsplash.jpg'

import React, { useState } from 'react'
import { FormControl} from '@mui/material';
import UserSearch from './UserSearch';
import UserSearchResults from './UserSearchResults';
import UserNavBar from './UserNavBar';
import { useLocation } from 'react-router-dom';
import { withStyles } from '@mui/styles';
function UserHome() {
    localStorage.getItem("activeStep")&&localStorage.removeItem("activeStep");
    localStorage.getItem("departureReserved")&&localStorage.removeItem("departureReserved");
    return (
     <div className="searchBack" style={{ backgroundImage: `url(${im})` }} >
         <UserNavBar ></UserNavBar>
         <UserSearch  position="absolute"></UserSearch>
     </div>
    )
}

export default(UserHome)
 