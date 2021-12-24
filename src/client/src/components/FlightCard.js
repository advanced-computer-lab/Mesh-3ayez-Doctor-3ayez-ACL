import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import im from './chanas-hclTKUfuf1U-unsplash.jpg'
import fly from './flight@2x.webp'
import bag from './travel-baggage.png'
import seat from './seat.png'
import fnum from './code.png'

import { useHistory } from "react-router-dom";
import { CardHeader } from '@mui/material';
import { Avatar } from '@mui/material';
import { withStyles } from '@mui/styles';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0
}));


function FlightCard(props) {
    const colors = require('../colors')
    const history = useHistory();
    const flight = {
        flight_id: props.flight_id,
        flight_number: props.flight_number,
        from: props.from,
        to: props.to,
        departure_time: props.departure_time,
        arrival_time: props.arrival_time,
        departure_terminal: props.departure_terminal,
        arrival_terminal: props.arrival_terminal,
        duration: props.duration,
        number_of_passengers: props.number_of_passengers,
        baggage: props.baggage,
        price: props.price,
        cabin_type: props.cabin_type
    }
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: colors.c2,
                backgroundColor: colors.c2,
                height: "1px",
                width: "60px",
                textAlign: "center",
                margin: "auto",
                marginTop: "20%",
                marginLeft: "10%"
            }}
        />
    );
    return (
        <Card
            sx={{ textAlign: "center", maxWidth: 1200 }}>
            <CardHeader style={{ textAlign: "center",marginTop:"auto", backgroundColor: colors.c5 }}
                avatar={
                    <Stack style={{textAlign:"center",marginTop:"auto"}} direction="row">
                        <img src={fnum} width="25px" height="25px"/>
                        <Typography color={colors.c1}>{props.flight_number}</Typography>
                    </Stack>
                }
                
                action={
                    <Stack style={{textAlign:"center",margin:"auto"}} direction="row" spacing={2}>
                        
                        <Typography color={colors.c1}> <img src={bag} width="20px" height="25px"/> {props.baggage}kg</Typography>
                       
                        <Typography color={colors.c1}> <img src={seat} width="20px" height="25px"/> {props.cabin_type}</Typography>
                    </Stack>


                }
            
            />
            {/* <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={im}
                alt="Live from space album cover"
            /> */}
            <CardContent  >
                <Box sx={{ display: "flex" }} spacing={2}>

                    <Stack spacing={1} direction="row">

                        <Stack spacing={2}  >
                            <Typography fontSize={20} fontWeight="Bold" color={colors.c1} >{props.from}</Typography>
                            <Typography color={colors.c1} >{props.departure_time}</Typography>
                        </Stack>
                        <Stack >
                            <Typography color={colors.c1}>{props.duration}</Typography>

                            <Stack style={{textAlign:"center",margin:"auto"}} direction="row" spacing={2}  >
                                <img style={{textAlign:"center",margin:"auto"}} src={fly} width="50px" height="50px" />
                                <ColoredLine />

                            </Stack>
                        </Stack>

                        <Stack spacing={2} sx={{ xs: 2 }}  >
                            <Typography fontSize={20} fontWeight="Bold" color={colors.c1} xs>{props.to}</Typography>
                            <Typography color={colors.c1} xs >{props.arrival_time}</Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography fontSize={20} fontWeight="Bold" color={colors.c1}>{props.price}$</Typography>
                        <Button style={{
                            borderRadius: 5,
                            backgroundColor: colors.c1,
                            marginTop: "25px",
                        }} size="small" variant="contained" onClick={() => props.onClick(flight)} >Reserve</Button>
                    </Stack>
                </Box>
                
            </CardContent>

            {/* <CardActions>
                <Button style={{
                    borderRadius: 5,
                    backgroundColor: colors.c1,
                    marginTop: "25px",
                }} size="small" variant="contained" onClick={() => props.onClick(flight)} >Reserve</Button>
            </CardActions> */}
        </Card>
    );
}
 export default withStyles()(FlightCard);