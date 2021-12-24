import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import im from './chanas-hclTKUfuf1U-unsplash.jpg'
import { useHistory } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FlightCard(props) {
    const colors= require('../colors')
    const history= useHistory();
    const flight ={
        flight_id:props.flight_id,
        flight_number:props.flight_number,
        from:props.from,
        to:props.to,
        departure_time:props.departure_time,
        arrival_time:props.arrival_time,
        departure_terminal:props.departure_terminal,
        arrival_terminal:props.arrival_terminal,
        duration:props.duration,
        number_of_passengers:props.number_of_passengers,
        baggage:props.baggage,
        price:props.price,
        cabin_type:props.cabin_type
        }
    
    return (
        <Card
       sx={{textAlign:"center", maxWidth: 1200, display:"flex" }}>
             <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={im}
                alt="Live from space album cover"
            />
            <CardContent>
                <Stack direction="row" spacing={2} >
                <Stack spacing={2} >
                        <Typography>Flight number</Typography>
                        <Typography>{props.flight_number}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>From</Typography>
                        <Typography>{props.from}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>To</Typography>
                        <Typography>{props.to}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>Departure time</Typography>
                        <Typography>{props.departure_time}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>Arrival time</Typography>
                        <Typography>{props.arrival_time}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>Duration</Typography>
                        <Typography>{props.duration}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>Cabin</Typography>
                        <Typography>{props.cabin_type}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography>Baggage</Typography>
                        <Typography>{props.baggage}</Typography>

                    </Stack>
                    <Stack spacing={2} >
                        <Typography color="">Price</Typography>
                        <Typography>{props.price}</Typography>

                    </Stack>
                </Stack>
            </CardContent>
           
            <CardActions>
                <Button style={{
                    borderRadius: 5,
                    backgroundColor: colors.c1,
                    marginTop: "25px",
                }} size="small" variant="contained" onClick={()=>props.onClick(flight)} >Reserve</Button>
            </CardActions>
        </Card>
    );
}
