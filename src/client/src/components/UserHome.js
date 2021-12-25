
import '../index.css';
import im from './f.jpg'

import React, { useState } from 'react'
import { FormControl, Typography} from '@mui/material';
import UserSearch from './UserSearch';
import UserSearchResults from './UserSearchResults';
import UserNavBar from './UserNavBar';
import { useLocation } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { Stack } from '@mui/material';
function UserHome() {
    localStorage.getItem("activeStep")&&localStorage.removeItem("activeStep");
    localStorage.getItem("departureReserved")&&localStorage.removeItem("departureReserved");
    return (    
    <React.Fragment>
     <div className="searchBack" style={{ backgroundImage: `url(${im})`, backgroundRepeat:"no-repeat", backgroundSize:"100%"}} >
     <UserNavBar ></UserNavBar>
         <Stack  className="typo">
         <Typography variant='h1' align='left' >TIJWAL</Typography>
         <Typography  variant='h4' align='left' fonsize="36px"> your expert for air flight</Typography>
         <Typography  variant='h4' align='left' fonsize="36px"> Explore the world with us!</Typography>
         </Stack>
         <UserSearch  position="absolute"></UserSearch>
     </div>
     </React.Fragment>
    )
}

export default(UserHome)
 