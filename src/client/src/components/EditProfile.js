import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BasicAlert from "./BasicAlert";
import Paper from '@mui/material/Paper';
import UserNavBar from './UserNavBar';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import profile from './images/profile.png'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { set } from 'mongoose';

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

const theme = createTheme();
const colors = require("../colors.js");


function EditProfile() {
    var id = localStorage.getItem("user_id");
    id=id.substring(1,id.length-1);    

    
    const [alert, setAlert] = useState(false);
    const [succ, setSucc] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const user = {
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            email: data.get('email'),
            passport: data.get('passport'),
        };

        axios.put("http://localhost:8000/api/users/edit_user/"+id, user,{headers: {'authentication-token' : localStorage.getItem('token'), "Content-Type": "application/json"}})
            .then(
                result => {
                    if (result.status == 200) {
                        setSucc(true);
                    setMsg("User updated")
                    setAlert(true);
                    }

                }
            )
            .catch(err => {
                    setSucc(false);

                    setMsg("Couldn't update Info")
                    setAlert(true);

                    console.log(err)
                }


            );                    setAlert(false);

    };
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        
                        
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        
                                        
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                       
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="passport"
                                        label="Passport"
                                        type="number"
                                        id="passport"
                                        

                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: colors.c1,
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                href="/user/profile"
                                sx={{ mt: 0, mb: 2 }}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: colors.c1,
                                }}
                            >
                                Back
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs>
                                    <Link href="/" variant="body2" style={{ color: colors.c1 }}>
                                        Back to home page
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        {alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}

                    </Box>

                    <Copyright sx={{ mt: 5 }} />
                    </Paper>
            </Container>

        </ThemeProvider>
    );
}

export default EditProfile
