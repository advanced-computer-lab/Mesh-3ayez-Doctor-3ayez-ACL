import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
const colors= require("../colors.js");

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.c2
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.c1
        },
        "& .MuiOutlinedInput-input": {
            color: colors.c2
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "black"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: colors.c1
        },
        "& .MuiInputLabel-outlined": {
            color: colors.c2
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "black"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: colors.c1
        }
    }
});
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:8000/">
                Tijwal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const [usernameErr, setUsernameErr] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState("");

    const [passErr, setPassErr] = useState(false);
    const [passMsg, setPassMsg] = useState("");

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const classes = useStyles()
    const history = useHistory();
    //  const [usernameErr, usernameErr]= useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const user = {
            email: data.get('email'),
            password: data.get('password'),
        };
        console.log(user);
        axios.post("http://localhost:8000/api/login", user, { "Content-Type": "application/json" })
                .then(
                    result => {
                        if (result.status == 200) {
                            history.push({
                                pathname: '/', state:
                                {
                                    token: result.data
                                    // user:props.user
                                }
                            });
                        }

                    }
                )
                .catch(err => {
                    console.log(err.response.data.msgSrc)
                    if (err.response.data.msgSrc === "email") {
                        setUsernameErr(true);
                        setUsernameMsg(err.response.data.msg);
                    } else if (err.response.data.msgSrc === "password") {
                        setPassErr(true);
                        setPassMsg(err.response.data.msg);
                    } else{
                        setErr(true);
                        setErrMsg(err.response.data.msg);
                    }


                });
    
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
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
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={usernameErr}
                                helperText={usernameMsg}
                                onChange={function(e){
                                    if(e.target.value)
                                    {
                                        setUsernameErr(false);
                                        setUsernameMsg("");
                                        
                                    }
                                
                                }
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passErr}
                                helperText={passMsg}
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item xs>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {err&&<Alert severity="error">{errMsg}</Alert>}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}