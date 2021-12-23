import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';function TableHead()
{
  return(<thead>
    <tr>
        <th>Flight Number</th>
        <th>From</th>
        <th>Departure Terminal</th>
        <th>To</th>
        <th>Arrival Terminal</th>
        <th>Available Eco-Class Seats</th>
        <th>Available Business-Class Seats</th>
        <th>Available First-Class Seats</th>
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