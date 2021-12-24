import CLOUDS from 'vanta/dist/vanta.clouds.min'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import BasicAlert from "./BasicAlert";
import Stack from '@mui/material/Stack';
import { Hidden } from '@mui/material';
import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import UserNavBar from './UserNavBar';
import { withStyles } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
// import { Console } from 'console';
var bcrypt = require('bcryptjs');

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

export default function PasswordChange(probs) {
    const id = "61c39db0805325b1c2d5b6a1";
    // const [vantaEffect, setVantaEffect] = useState(0)
    // const myRef = useRef(null)
    // useEffect(() => {
    //     if (!vantaEffect) {
    //         setVantaEffect(CLOUDS({
    //             el: myRef.current,
    //             THREE: THREE,
    //             mouseControls: true,
    //             touchControls: true,
    //             gyroControls: false,
    //             minHeight: 754.00,
    //             minWidth: 200.00,
    //             speed: 1.00,
    //             baseColor: 0xffffff
    //         }))
    //     }
    //     return () => {
    //         if (vantaEffect) vantaEffect.destroy()
    //     }
    // }, [vantaEffect])
    
    // const [row,setRow] = useState({
    //     id: probs.id,
    //     first_name: probs.first_name,
    //     last_name: probs.last_name,
    //     username:probs.lastname,
    //     password: probs.password,
    //     passport:probs.passport,
    //     email:probs.email
    //   });
    
    const [Password, setPassword] = useState({
        password: "",
        showPassword: false,
    })
    const [Password1, setPassword1] = useState({
        password: "",
        showPassword: false,
    })
    const [Password2, setPassword2] = useState({
        password: "",
        showPassword: false,
    })
    const handleClickShowPassword = () => {
        setPassword({ ...Password, showPassword: !Password.showPassword });
    };
    const handleClickShowPassword1 = () => {
        setPassword1({ ...Password1, showPassword: !Password1.showPassword });
    };
    const handleClickShowPassword2 = () => {
        setPassword2({ ...Password2, showPassword: !Password2.showPassword });
    };
    const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...Password, [prop]: event.target.value });
    };
    const handlePasswordChange1 = (prop) => (event) => {
        setPassword1({ ...Password1, [prop]: event.target.value });
    };
    const handlePasswordChange2 = (prop) => (event) => {
        setPassword2({ ...Password2, [prop]: event.target.value });
    };  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };
    
        
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const [errorPassword, setErrorPassword] = useState("");
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");

    const [alert, setAlert] = useState(false);
    const [succ, setSucc] = useState(false);
    const [msg, setMsg] = useState("");

    const onSubmit = function (e) {
        // console.log("onsubmit")
        e.preventDefault()
        var s="";
        axios.get("http://localhost:8000/api/users/" + id)
                .then(result => {
                    s=result.password;
                }
                )
                .catch(err => console.log(err));
        const match=bcrypt.compare(Password.password,s)        
        console.log(match)
        if (match){
            console.log("Entered")
            if(Password1.password===Password2.password){
            const data = {"password":Password1}
            axios.put("http://localhost:8000/api/users/changePassword/" + id, data, { "Content-Type": "application/json" })
                .then(result => {
                    console.log("added")
                    setSucc(true);
                    setMsg("Password Changed Successfully")
                    setAlert(true);
                }
                )
                .catch(err => {setSucc(false);
                setMsg(err);
                setAlert(true);});
            }else{
                console.log(Password1+" "+Password2);
                setSucc(false);
                    setMsg("Passwords Don't match")
                    setAlert(true);
            }
        }else{
            setSucc(false);
            setMsg("Old Password is wrong")
            setAlert(true);
        }
    }
    return (
        <div   >
            <UserNavBar></UserNavBar>
            <ThemeProvider theme={theme} >
                <Grid container component="main" sx={{ height: '80vh', width: "70%", margin: "auto", marginTop: "3%", marginBottom: "3%" }} >
                    <Grid item
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
                                Change Password
                            </Typography>
                            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>

                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" label="Password">
                                    <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        label="Password"
                                        type={Password.showPassword ? 'text' : 'password'}
                                        onChange={handlePasswordChange('password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {Password.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" label="Password">
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        label="Password"
                                        type={Password1.showPassword ? 'text' : 'password'}
                                        onChange={handlePasswordChange1('password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword1}
                                            edge="end"
                                            >
                                            {Password1.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl  sx={{ m: 1, width: '25ch' }} variant="outlined" >
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        label="Password"
                                        type={Password2.showPassword ? 'text' : 'password'}
                                        onChange={handlePasswordChange2('password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                            edge="end"
                                            >
                                            {Password2.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>

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
                                    Done
                                </Button><Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 0, mb: 2 }}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: colors.c1,
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs>
                                        <Link href="/" variant="body2" style={{ color: colors.c1 }}>
                                            Go to home page
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            {alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}

                        </Box>
                        <Copyright sx={{ mt: 5 }} />

                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}