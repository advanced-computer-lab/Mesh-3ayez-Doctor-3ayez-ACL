import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
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


function Signup() {

    const [firstNameErr, setFirstNameErr] = useState(false);
    const [firstNameMsg, setFirstNameMsg] = useState("");

    const [lastNameErr, setLastNameErr] = useState(false);
    const [lastNamMsg, setLastNameMsg] = useState("");

    const [usernameErr, setUsernameErr] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState("");

    const [emailErr, setEmailErr] = useState(false);
    const [emailMsg, setEmailMsg] = useState("");

    const [passErr, setPassErr] = useState(false);
    const [passMsg, setPassMsg] = useState("");

    const [passportErr, setPassportErr] = useState(false);
    const [passportMsg, setPassportMsg] = useState("");

    const [err, setErr] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const user = {
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            passport: data.get('passport'),
        };

        axios.post("http://localhost:8000/api/register", user, { "Content-Type": "application/json" })
            .then(
                result => {
                    if (result.status == 200) {
                        history.push({
                            pathname: '/', state:
                            {
                                token: result.data.token,
                                user: result.data.user
                            }
                        });
                    }

                }
            )
            .catch(err => {
                if (err.response.data.msgSrc === "missing input") {
                    if (!user.first_name) {
                        setFirstNameErr(true);
                        setFirstNameMsg("This field is required");
                    }
                    if (!user.last_name) {
                        setLastNameErr(true);
                        setLastNameMsg("This field is required");
                    }
                    if (!user.username) {
                        setUsernameErr(true);
                        setUsernameMsg("This field is required");
                    }
                    if (!user.email) {
                        setEmailErr(true);
                        setEmailMsg("This field is required")
                    }
                    if (!user.password) {
                        setPassErr(true);
                        setPassMsg("This field is required");
                    }
                    if (!user.passport) {
                        setPassportErr(true);
                        setPassportMsg("This field is required");
                    }
                } else if (err.response.data.msgSrc === "taken") {
                    setErr(true);
                    setErrMsg(err.response.data.msg);
                } else {
                    console.log(err)
                }


            });
    };
    return (
        <ThemeProvider theme={theme} >
            <Grid container component="main" sx={{ height: '80vh', width: "70%", margin: "auto", marginTop: "3%", marginBottom: "3%" }} >
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://live.staticflickr.com/8367/8507160908_ec45d733ed_b.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                    <CssBaseline />
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: colors.c1 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" color={colors.c1}>
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        error={firstNameErr}
                                        helperText={firstNameMsg}
                                        onChange={function (e) {
                                            if (e.target.value) {
                                                setFirstNameErr(false);
                                                setFirstNameMsg("");
                                            } else {
                                                setFirstNameErr(true);
                                                setFirstNameMsg("This field is required");
                                            }
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        error={lastNameErr}
                                        helperText={lastNamMsg}
                                        onChange={function (e) {
                                            if (e.target.value) {
                                                setLastNameErr(false);
                                                setLastNameMsg("");
                                            } else {
                                                setLastNameErr(true);
                                                setLastNameMsg("This field is required");
                                            }
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        error={usernameErr}
                                        helperText={usernameMsg}
                                        onChange={function (e) {
                                            if (e.target.value) {
                                                setUsernameErr(false);
                                                setUsernameMsg("");
                                            } else {
                                                setUsernameErr(true);
                                                setUsernameMsg("This field is required");
                                            }
                                        }
                                        }
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
                                        error={emailErr}
                                        helperText={emailMsg}
                                        onChange={function (e) {
                                            if (e.target.value) {
                                                setEmailErr(false);
                                                setEmailMsg("");
                                            } else {
                                                setEmailErr(true);
                                                setEmailMsg("This field is required");
                                            }
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        error={passErr}
                                        helperText={passMsg}
                                        onChange={function (e) {
                                            if (e.target.value) {
                                                setPassErr(false);
                                                setPassMsg("");
                                            } else {
                                                setPassErr(true);
                                                setPassMsg("This field is required");
                                            }
                                        }
                                        }
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
                                        error={passportErr}
                                        helperText={passportMsg}
                                        onChange={function (e) {
                                            if (e.target.value) {
                                                setPassportErr(false);
                                                setPassportMsg("");
                                            } else {
                                                setPassportErr(true);
                                                setPassportMsg("This field is required");
                                            }
                                        }
                                        }

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
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs>
                                    <Link href="/login" variant="body2" style={{ color: colors.c1 }}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        {err && <Typography color="red" >{errMsg}</Typography>}

                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}

export default Signup
