import CLOUDS from 'vanta/dist/vanta.clouds.min'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from "three";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicAlert from "./BasicAlert";
import Stack from '@mui/material/Stack';
import { Hidden } from '@mui/material';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

export default function UserProfile(probs) {
    const id = "61aa4dadbde7d1780db3dda5";
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(CLOUDS({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 754.00,
                minWidth: 200.00,
                speed: 1.00,
                baseColor: 0xffffff
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    
    const [row,setRow] = useState({
        id: probs.id,
        first_name: probs.first_name,
        last_name: probs.last_name,
        username:probs.lastname,
        password: probs.password,
        passport:probs.passport,
        email:probs.email
      });
    const [username, setUsername] = useState(probs.username)
    const [FirstName, setFirstName] = useState(probs.FirstName)
    const [LastName, setLastName] = useState(probs.LastName)
    const [email, setEmail] = useState(probs.email);
    const [Passport, setPassport] = useState(probs.Passport)
    const [Password, setPassword] = useState(probs.Password)
    const [Password1, setPassword1] = useState({
        password: "",
        showPassword: false,
    })
    const [Password2, setPassword2] = useState({
        password: "",
        showPassword: false,
    })
    const handleClickShowPassword1 = () => {
        setPassword1({ ...Password1, showPassword: !Password1.showPassword });
    };
    const handleClickShowPassword2 = () => {
        setPassword2({ ...Password2, showPassword: !Password2.showPassword });
    };
    const handlePasswordChange1 = (prop) => (event) => {
        setPassword1({ ...Password1, [prop]: event.target.value });
    };
        
    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };
    const handlePasswordChange2 = (prop) => (event) => {
        setPassword2({ ...Password2, [prop]: event.target.value });
    };
        
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const [errorPassword2, setErrorPassword2] = useState("");

    const [alert, setAlert] = useState(false);
    const [succ, setSucc] = useState(false);
    const [msg, setMsg] = useState("");

    const onSubmit = function (e) {
        e.preventDefault()
        setUsername(username?username:row.username);
        setFirstName(FirstName?FirstName:row.first_name);
        setLastName(LastName?LastName:row.last_name);
        setEmail(email?email:row.email);
        setPassport(Passport?Passport:row.passport);

        
        var f=false;

        // if (!username)
        //     setErrorusername("This field is required");
        // if (!FirstName)
        //     setErrorFirstName("This field is required");
        // if (!LastName)
        //     setErrorLastName("This field is required");
        // if (!email)
        //     setErroremail("This field is required");
        // if (!Passport)
        //     setErrorPassport("This field is required");
        if (Password1){
            if (!Password2)
                setErrorPassword2("This field is required");
            else if(Password1!=Password2){
                setErrorPassword2("Password doesn't match");
            }
            else{
                setPassword(Password1);
            }
           
        }else{
            setPassword(row.password);
        }
        const data = {
            // "username": username,
            "first_name": FirstName,
            "last_name": LastName,
            "email": email,
            "Passport": Passport,
            // "Password":Password
            
        }
        if (username || FirstName || LastName || email || Passport ||Password) {
            axios.put("http://localhost:8000/api/users/" + id, data, { "Content-Type": "application/json" })
                .then(result => {
                    setSucc(true);
                    setMsg("User updated")
                    setAlert(true);
                }
                )
                .catch(err => console.log(err));


        }
        setAlert(false);



    }
    return (
        <div   >
            <div className='background' ref={myRef} style = {{     paddingTop: '1px',
    marginTop: '-1px' }}>
            <div className = "center"  >
                <div id = 'box' style={{  margin: "auto", marginTop: "70px", backgroundColor: "#142F43", width: "640px", height: "80px", textAlign: "center", boxShadow: "px #999999" }}>
                    <h1 style={{ color: "whitesmoke", padding: "20px" }}>Edit Profile</h1>
                </div>

                    <Box
                    
                        // marginTop="100px"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        width="600px"
                        padding="20px"
                        style={{ background: "#F7F7F7", borderRaduis: "10%", boxShadow: "2px auto #999999" }}
                        display="inline-block"

                    >
                        {/* <TextField
                            
                            onChange={function (e) {
                                setUsername(e.target.value);
                            }}
                            value={username}
                            id="outlined-required"
                            label="Username"
                            type="String"
                        /> */}

                        <TextField
                            
                            id="outlined-required"
                            label="First Name"
                            onChange={function (e) {
                                setFirstName(e.target.value);
                            }
                            }
                            value={FirstName}
                            type="String"

                        />
                        <TextField
                            id="outlined-required"
                            label="Last Name"
                            onChange={function (e) {
                                setLastName(e.target.value);
                            }
                            }
                            value={LastName}
                            type="String"
                        />
                        <TextField
                            id="outlined-required"
                            label="Email"
                            onChange={function (e) {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            type="String"
                        />
                        
                        {/* <InputLabel htmlFor="outlined-adornment-password">Change Password</InputLabel>
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
                        </FormControl> */}

                        
                        <TextField
                            required
                            id="outlined-required"
                            label="Passport"
                            onChange={function (e) {
                                setPassport(e.target.value);
                            }}
                            value={Passport}
                            type="Number"
                        />
                         {/* <TextField
                            id="outlined-required"
                            label="New Password"
                            type={Password1.showPassword ? "text" : "password"}
                            onChange={handlePasswordChange1("password")}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword1}

                                >
                                {Password1.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        /> */}
                         {/* <TextField
                            id="outlined-required"
                            type="password"
                            label="Confirm new password"
                            onChange={function (e) {
                                setPassword2(e.target.value);
                            }
                            }
                            error={errorPassword2 ? true : false}
                            helperText={errorPassword2}

                        /> */}

                        <br />
                        <br />
                        <Stack direction="row" spacing={1} >
                            <Button style={{ textAlign: "center", marginLeft: "auto",height:"30px" }} variant="contained" onClick={onSubmit} href="/">Submit </Button>
                            <Button style={{ margin: "auto",height:"30px" }} variant="outlined" href="/">Back </Button>
                        </Stack>
                        <br />
			{alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}


                    </Box>
                </div>
            </div>
        </div>
    );
}