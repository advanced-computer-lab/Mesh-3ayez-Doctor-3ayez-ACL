import '../index.css';
import im from './margo-brodowicz-KZHhnb6XsQI-unsplash.jpg'

import React from 'react'
import { FormControl } from '@mui/material';
import UserSearch from './UserSearch';
import UserSearchResults from './UserSearchResults';

function UserHome() {
    return (
     <div className="searchBack" style={{ backgroundImage: `url(${im})` }} >

         <UserSearch></UserSearch>
     </div>
    )
}

export default UserHome


