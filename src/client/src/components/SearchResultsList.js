import React from 'react'
import {useSelector} from 'react-redux'

function SearchResultsList() {
    const {flights} = useSelector((state)=> state.flightSearch)
    console.log(flights);
    return (
        <div>{
            flights['departure_flights'].map(item=>{
               return (<h1>{item.from}</h1>)
            })
            
         }
        </div>
    )
}

export default SearchResultsList
