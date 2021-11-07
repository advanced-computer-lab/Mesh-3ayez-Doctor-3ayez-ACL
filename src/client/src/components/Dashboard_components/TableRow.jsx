import { useState } from "react";


function TableRow(probs) {
  const id = probs.id;
  const row = (useState({
    id: probs.id,
    flight_number: probs.flight_number,
    from: probs.from,
    to: probs.to,
    economy_seats: probs.economy_seats,
    business_seats: probs.business_seats,
    first_seats: probs.first_seats,
    departure_time: probs.departure_time,
    arrival_time: probs.arrival_time
  }))[0];
 

  return (
    <tr id={id}>
      <td>{row.flight_number}</td>
      <td>{row.from}</td>
      <td>{row.to}</td>
      <td>{row.economy_seats}</td>
      <td>{row.business_seats}</td>
      <td>{row.first_seats}</td>
      <td>{row.departure_time}</td>
      <td>{row.arrival_time}</td>
      <td><button onClick={()=>probs.edit_callback(row)}className="btn edt"> Edit</button></td>
      <td><button onClick={()=>probs.delete_callback(id)}
      className="btn dlt">Delete</button></td>
     
    </tr>
  )
}


export default TableRow;