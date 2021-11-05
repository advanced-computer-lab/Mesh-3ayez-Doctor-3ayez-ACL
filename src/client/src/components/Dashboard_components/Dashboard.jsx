import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TableHead from './TableHead';
import TableRow from "./TableRow";

 
function Dashboard() {
 
    const [rows,updateRows]=useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/flights/")
    .then(res=>{

        updateRows(res.data);
    //   console.log(res.data);
    })
    
  }, []);


    function foo(id){
        updateRows(rows.filter(x=>(x._id!==id)));
        axios.delete("http://localhost:8000/api/flights/"+id);
    }        
    return (
        <div>

            <table className="styled-table">
                <TableHead />
                <tbody>
                    {
                        rows.map((flight)=>{
                            return <TableRow 
                                    key={flight._id}
                                    id={flight._id}
                                    flight_number = {flight.flight_number}
                                    from= {flight.from}
                                    to={flight.to}
                                    economy_seats={flight.economy_seats}
                                    business_seats={flight.business_seats}
                                    first_seats={flight.first_seats}
                                    departure_time={flight.departure_time}
                                    arrival_time={flight.arrival_time}
                                    delete_callback={foo}
  />
                        })
                    }
                </tbody>

            </table>
        </div>
    );
}
export default Dashboard;
