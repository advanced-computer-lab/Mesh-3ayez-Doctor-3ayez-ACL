import React from 'react'
import UserSearch from './UserSearch'
import UserNavBar from './UserNavBar'
import SearchResultsList from './SearchResultsList';
import {useEffect,useState} from 'react'
function UserSearchResults() {
    return (
        <div>
            {/* <UserNavBar></UserNavBar> */}
            <UserSearch></UserSearch>
            <SearchResultsList ></SearchResultsList>
        </div>
    )
}

export default UserSearchResults
