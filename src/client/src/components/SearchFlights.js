import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function SearchFlights(probs) {
    const [open, setOpen] = React.useState(true);
    const [flight_no, setFlightNo] = React.useState('');
    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
    const [arrival_time, setArrivalTime] = React.useState('');
    const [departure_time, setDepartureTime] = React.useState('');
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    const data = {
        "flight_number": flight_no,
        "from": from,
        "to": to,
        "arrival_time": arrival_time,
        "departure_time": departure_time
    }
    console.log(data)
    axios.post("http://localhost:8000/api/flights/search", data,{"Content-Type":"application/json"})
            .then(result => probs.setRows(result.data))
            .catch(err => console.log(err));
    setOpen(false);
  }

  

  return (
    <div>
      <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{background:"#D9E4EC"}}
            width="100%"
            margin="auto"
        >
          <br/>
          <Typography variant="h5" gutterBottom component="div" color="#274472">
            Find your flight!
            </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="flno"
            label="Flight Number"
            type="text"
            onChange = {function(e){
                setFlightNo(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="from"
            label="From"
            type="text"
            onChange = {function(e){
                setFrom(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="to"
            label="To"
            type="text"
            onChange = {function(e){
                setTo(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="arrivaltime"
            label="Arrival Time"
            type="text"
            onChange = {function(e){
                setArrivalTime(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="departuretime"
            label="Departure Time"
            type="text"
            onChange = {function(e){
                setDepartureTime(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
        
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <br/>
          <Button variant="contained" onClick={handleSearch}>Search</Button>
          <br/>
        </Box>
    </div>
  );
}
