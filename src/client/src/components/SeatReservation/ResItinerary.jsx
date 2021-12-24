import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export function ResItinerary(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper elevation={3} >
          <Box sx={{ bgcolor: '#4682b4', height: '13vh', textAlign: "left" }}>
            <h1 style={{ color: 'white', textShadow: "2px 1px #666666", padding: "4%" }}>Travel Itinerary</h1>
          </Box>
          <Box sx={{ bgcolor: '#ffffff', height: '12vh' }}>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>Price: {props.price}</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>Reservation id: {props.resId}</p>
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">

            <Box gridColumn="span 3" sx={{ bgcolor: '#4682b4', height: '8vh' }} >
              <p style={{ color: 'white', textShadow: "2px 1px #666666", textAlign: "left", paddingLeft: "25%" }}>Departure</p>
            </Box>
            <Box gridColumn="span 9 " sx={{ bgcolor: '#abcdef', height: '8vh' }} />
          </Box>
          <Box sx={{ bgcolor: '#ffffff', height: '23vh' }}>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>From: {props.depFrom }, Departure time: {props.depDDay } at { props.depDTime} Terminal { props.depDT}</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>To: {props.depTo}, Arrival time: {props.depADay} at {props.depATime } Terminal {props.depAT }</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>Seats: {props.depSeats }</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>Cabin Type: {props.cabin}</p>
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">

            <Box gridColumn="span 3" sx={{ bgcolor: '#4682b4', height: '8vh' }} >
              <p style={{ color: 'white', textShadow: "2px 1px #666666", textAlign: "left", paddingLeft: "25%" }}>Return</p>
            </Box>
            <Box gridColumn="span 9 " sx={{ bgcolor: '#abcdef', height: '8vh' }} />
          </Box>
          <Box sx={{ bgcolor: '#ffffff', height: '23vh' }}>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>From: { props.retFrom}, Departure time: {props.retDDay} at {props.retDTime} Terminal {props.retDT }</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>To: {props.retTo}, Arrival time: {props.retADay} at {props.retATime } Terminal {props.retAT }</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>Seats: {props.retSeats}</p>
            <p style={{ textAlign: "left", paddingLeft: "7%" }}>Cabin Type: {props.cabin}</p>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}