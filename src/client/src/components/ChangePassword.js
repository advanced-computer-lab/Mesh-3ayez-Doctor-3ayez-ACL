// import CLOUDS from 'vanta/dist/vanta.clouds.min'
// import axios from 'axios';
// import React, { useState, useEffect, useRef } from 'react'
// import * as THREE from "three";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import BasicAlert from "./BasicAlert";
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import { Hidden } from '@mui/material';
// import IconButton from "@material-ui/core/IconButton";
// import InputLabel from "@material-ui/core/InputLabel";
// import Visibility from "@material-ui/icons/Visibility";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import OutlinedInput from '@mui/material/OutlinedInput';
// import FormControl from '@mui/material/FormControl';
// import UserNavBar from './UserNavBar';
// import { withStyles } from '@material-ui/core';
// import { STATES } from 'mongoose';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useHistory, useLocation } from "react-router-dom";
// import { set } from 'mongoose';



// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="http://localhost:3000/">
//                 Tijwal
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const theme = createTheme();
// const colors = require("../colors.js");

// export default function EditProfile() {
//     const id = "61aa4dadbde7d1780db3dda5";
//     const [vantaEffect, setVantaEffect] = useState(0)
//     const myRef = useRef(null)
//     useEffect(() => {
//         if (!vantaEffect) {
//             setVantaEffect(CLOUDS({
//                 el: myRef.current,
//                 THREE: THREE,
//                 mouseControls: true,
//                 touchControls: true,
//                 gyroControls: false,
//                 minHeight: 754.00,
//                 minWidth: 200.00,
//                 speed: 1.00,
//                 baseColor: 0xffffff
//             }))
//         }
//         return () => {
//             if (vantaEffect) vantaEffect.destroy()
//         }
//     }, [vantaEffect])
    
//     const [passOldErr, setPassOldErr] = useState(false);
//     const [passOld, setPassOld] = useState("");

//     const [passErr1, setPassErr1] = useState(false);
//     const [pass1, setPass1] = useState("");

//     const [passErr2, setPassErr2] = useState(false);
//     const [pass2, setPass2] = useState("");

//     const [err, setErr] = useState(false);

//     const [errMsg, setErrMsg] = useState("");

//     const history = useHistory();

 

//     const [succ, setSucc] = useState(false);
//     const [msg, setMsg] = useState("");

//     const onSubmit = function (e) {
//         e.preventDefault()
        
        
//         if (Password1){
//             if (!Password2)
//                 setErrorPassword2("This field is required");
//             else if(Password1!=Password2){
//                 setErrorPassword2("Password doesn't match");
//             }
//             else{
//                 setPassword(Password1);
//             }
           
//         }else{
//             setPassword(row.password);
//         }
//         const data = {
            
//             "Password":Password
            
//         }
//         if (Password) {
//             axios.put("http://localhost:8000/api/users/" + id, data, { "Content-Type": "application/json" })
//                 .then(result => {
//                     setSucc(true);
//                     setMsg("User updated")
//                     setAlert(true);
//                 }
//                 )
//                 .catch(err => console.log(err));


//         }
//         setAlert(false);



//     }
//     return (
//     <ThemeProvider theme={theme} >
//         <Grid container component="main" sx={{ height: '80vh', width: "70%", margin: "auto", marginTop: "3%", marginBottom: "3%" }} >
//             <Grid
//                 item
//                 xs={false}
//                 sm={4}
//                 md={7}
//                 sx={{
//                     backgroundImage: 'url(https://live.staticflickr.com/8367/8507160908_ec45d733ed_b.jpg)',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundColor: (t) =>
//                         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//             />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         my: 8,
//                         mx: 4,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: colors.c1 }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5" color={colors.c1}>
//                         Edit Account Info
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     autoComplete="given-name"
//                                     name="firstName"
//                                     required
//                                     fullWidth
//                                     id="firstName"
//                                     label="First Name"
//                                     autoFocus
//                                     error={firstNameErr}
//                                     helperText={firstNameMsg}
//                                     onChange={function (e) {
//                                         if (e.target.value) {
//                                             setFirstNameErr(false);
//                                             setFirstNameMsg("");
//                                         } else {
//                                             setFirstNameErr(true);
//                                             setFirstNameMsg("This field is required");
//                                         }
//                                     }
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="lastName"
//                                     label="Last Name"
//                                     name="lastName"
//                                     autoComplete="family-name"
//                                     error={lastNameErr}
//                                     helperText={lastNamMsg}
//                                     onChange={function (e) {
//                                         if (e.target.value) {
//                                             setLastNameErr(false);
//                                             setLastNameMsg("");
//                                         } else {
//                                             setLastNameErr(true);
//                                             setLastNameMsg("This field is required");
//                                         }
//                                     }
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="username"
//                                     label="Username"
//                                     name="username"
//                                     autoComplete="username"
//                                     error={usernameErr}
//                                     helperText={usernameMsg}
//                                     onChange={function (e) {
//                                         if (e.target.value) {
//                                             setUsernameErr(false);
//                                             setUsernameMsg("");
//                                         } else {
//                                             setUsernameErr(true);
//                                             setUsernameMsg("This field is required");
//                                         }
//                                     }
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Email Address"
//                                     name="email"
//                                     autoComplete="email"
//                                     error={emailErr}
//                                     helperText={emailMsg}
//                                     onChange={function (e) {
//                                         if (e.target.value) {
//                                             setEmailErr(false);
//                                             setEmailMsg("");
//                                         } else {
//                                             setEmailErr(true);
//                                             setEmailMsg("This field is required");
//                                         }
//                                     }
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     autoComplete="new-password"
//                                     error={passErr}
//                                     helperText={passMsg}
//                                     onChange={function (e) {
//                                         if (e.target.value) {
//                                             setPassErr(false);
//                                             setPassMsg("");
//                                         } else {
//                                             setPassErr(true);
//                                             setPassMsg("This field is required");
//                                         }
//                                     }
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="passport"
//                                     label="Passport"
//                                     type="number"
//                                     id="passport"
//                                     error={passportErr}
//                                     helperText={passportMsg}
//                                     onChange={function (e) {
//                                         if (e.target.value) {
//                                             setPassportErr(false);
//                                             setPassportMsg("");
//                                         } else {
//                                             setPassportErr(true);
//                                             setPassportMsg("This field is required");
//                                         }
//                                     }
//                                     }

//                                 />
//                             </Grid>

//                         </Grid>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             onClick={onSubmit} href="/"
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                             style={{
//                                 borderRadius: 5,
//                                 backgroundColor: colors.c1,
//                             }}
//                         >Change Password
//                         </Button>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             onClick={onSubmit} href="/"
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                             style={{
//                                 borderRadius: 5,
//                                 backgroundColor: colors.c1,
//                             }}
//                         >Back
//                         </Button>
//                         <Grid container justifyContent="flex-end">
//                             <Grid item xs>
//                                 <Link href="/login" variant="body2" style={{ color: colors.c1 }}>
//                                     Already have an account? Sign in
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                     {err && <Typography color="red" >{errMsg}</Typography>}

//                 </Box>
//                 <Copyright sx={{ mt: 5 }} />
//             </Grid>
//         </Grid>

//     </ThemeProvider>
// );
//         <div   >
//             <div>
//          <UserNavBar></UserNavBar>
//          </div>
//             <div className='background' ref={myRef} style = {{     paddingTop: '1px',
//     marginTop: '-1px' }}>
//             <div className = "center"  >
//                 <div id = 'box' style={{  margin: "auto", marginTop: "70px", backgroundColor: "#142F43", width: "640px", height: "80px", textAlign: "center", boxShadow: "px #999999" }}>
//                     <h1 style={{ color: "whitesmoke", padding: "20px" }}>Edit Profile</h1>
//                 </div>

//                     <Box
                    
//                         // marginTop="100px"
//                         component="form"
//                         sx={{
//                             '& .MuiTextField-root': { m: 1, width: '25ch' },
//                         }}
//                         noValidate
//                         autoComplete="off"
//                         width="600px"
//                         padding="20px"
//                         style={{ background: "#F7F7F7", borderRaduis: "10%", boxShadow: "2px auto #999999" }}
//                         display="inline-block"

//                     >
                      

        
                      
                      
                        
//                         {/* <InputLabel htmlFor="outlined-adornment-password">Change Password</InputLabel>
//                         <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" label="Password">
//                         <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-password"
//                                 label="Password"
//                                 type={Password1.showPassword ? 'text' : 'password'}
//                                 onChange={handlePasswordChange1('password')}
//                                 endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleClickShowPassword1}
//                                 onMouseDown={handleMouseDownPassword1}
//                                 edge="end"
//                                 >
//                                 {Password1.showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                             }
//                         />
//                         </FormControl>
//                         <FormControl  sx={{ m: 1, width: '25ch' }} variant="outlined" >
//                             <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>

//                             <OutlinedInput
//                                 id="outlined-adornment-password"
//                                 label="Password"
//                                 type={Password2.showPassword ? 'text' : 'password'}
//                                 onChange={handlePasswordChange2('password')}
//                                 endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleClickShowPassword2}
//                                 onMouseDown={handleMouseDownPassword2}
//                                 edge="end"
//                                 >
//                                 {Password2.showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>

//                             }
//                         />
//                         </FormControl> */}

                        
//                         <TextField
//                             required
//                             id="outlined-required"
//                             label="Passport"
//                             onChange={function (e) {
//                                 setPassport(e.target.value);
//                             }}
//                             value={Passport}
//                             type="Number"
//                         />
//                          {/* <TextField
//                             id="outlined-required"
//                             label="New Password"
//                             type={Password1.showPassword ? "text" : "password"}
//                             onChange={handlePasswordChange1("password")}
//                             endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                 onClick={handleClickShowPassword1}
//                                 onMouseDown={handleMouseDownPassword1}

//                                 >
//                                 {Password1.showPassword ? <Visibility /> : <VisibilityOff />}
//                                 </IconButton>
//                                 </InputAdornment>
//                             }
//                         /> */}
//                          {/* <TextField
//                             id="outlined-required"
//                             type="password"
//                             label="Confirm new password"
//                             onChange={function (e) {
//                                 setPassword2(e.target.value);
//                             }
//                             }
//                             error={errorPassword2 ? true : false}
//                             helperText={errorPassword2}

//                         /> */}

                       
// 			{alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}


//                     </Box>
//                 </div>
//             </div>
//         </div>
//     );
// }