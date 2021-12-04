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
        <th>Departure Time</th>
        <th>Arrival Time</th>
        <th>Price</th>
        <th>Baggage Allowance</th>
    </tr>
</thead>
);
}

export default TableHead;