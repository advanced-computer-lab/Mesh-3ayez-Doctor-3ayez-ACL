function TableHead()
{
  return(<thead>
    <tr>
        <th>Flight Number</th>
        <th>From</th>
        <th>To</th>
        <th>Number of available Economy-Class Seats</th>
        <th>Number of available Business-Class Seats</th>
        <th>Number of available First-Class Seats</th>
        <th>Departure Time</th>
        <th>Arrival Time</th>
        <th></th>
        <th>
        <Button style={{color: "aliceblue"}} className="addButton" href="/admin/createFlight">create Flight</Button>
        </th>
    </tr>
</thead>
);
}

export default TableHead;