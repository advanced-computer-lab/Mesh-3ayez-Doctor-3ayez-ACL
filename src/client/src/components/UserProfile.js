import CLOUDS from 'vanta/dist/vanta.clouds.min'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from "three";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicAlert from "./BasicAlert";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Hidden } from '@mui/material';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import UserNavBar from './UserNavBar';
import { withStyles } from '@material-ui/core';
import { STATES } from 'mongoose';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import profile from './images/profile.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory, useLocation } from "react-router-dom";
import { set } from 'mongoose';


export default function UserProfile(probs) {
    const history = useHistory();
    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="http://localhost:3000/">
                    Tijwal
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    localStorage.getItem("activeStep") && localStorage.removeItem("activeStep");
    localStorage.getItem("departureReserved") && localStorage.removeItem("departureReserved");
    var id = localStorage.getItem("user_id");
    id = id.substring(1, id.length - 1);


    const theme = createTheme();
    const colors = require("../colors.js");

    const [username, setUsername] = useState(probs.username)
    const [FirstName, setFirstName] = useState(probs.FirstName)
    const [LastName, setLastName] = useState(probs.LastName)
    const [email, setEmail] = useState(probs.email);
    const [Passport, setPassport] = useState(probs.Passport)
    const [homeAddress, setHomeAddress] = useState(probs.homeAddress)
    const [countryCode, setCountryCode] = useState(probs.CountryCode)
    const [mobile, setMobile] = useState(probs.Mobile)

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + id, { headers: { 'authentication-token': localStorage.getItem('token'), "Content-Type": "application/json" } })
            .then(res => {
                setUsername(res.data.username);
                setEmail(res.data.email);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setPassport(res.data.passport);
                setHomeAddress(res.data.home_address);
                setCountryCode(res.data.country_code);
                setMobile(res.data.mobile_number);


                console.log(res);

            }).catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <ThemeProvider theme={theme} >
            <UserNavBar></UserNavBar>

            <Container maxWidth="md">
                <CssBaseline />
                <Paper elevation={4} style={{paddingTop:"2%", marginTop:"2%"}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img sx={{ bgcolor: colors.c1 }} width="100px" height="100px" src={profile} />
                        <br></br>
                        <Box>
                            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                <Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>username: </strong>{username}

                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>First Name: </strong>
                                        {FirstName}

                                    </Typography>
                                </Grid><Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>Last Name: </strong>
                                        {LastName}

                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>Email: </strong>
                                        {email}

                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>Passport Number: </strong>
                                        {Passport}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>Home Address: </strong>
                                        {homeAddress}
                                    </Typography>
                                </Grid><Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>Country Code: </strong>
                                        {countryCode}
                                    </Typography>
                                </Grid><Grid item xs={12} >
                                    <Typography variant="h5" textAlign="left" marginLeft="0px" color="#616666" gutterBottom component="div">
                                        <strong>Mobile Number: </strong>
                                        0{mobile}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: colors.c1,
                                }} href="/user/EditProfile"
                            >
                                Edit Account Info
                            </Button><Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 0, mb: 2 }}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: colors.c1,
                                }} href="/user/changePassword"
                            >
                                Change Password
                            </Button><Button
                                fullWidth
                                variant="contained"
                                href="/"
                                sx={{ mt: 0, mb: 2 }}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: colors.c1,
                                }}
                            >Back
                            </Button>
                        </Box>


                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Paper>
            </Container>
     
        </ThemeProvider>
    );

}

