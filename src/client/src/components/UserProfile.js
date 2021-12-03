import { useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import BasicAlert from "./BasicAlert";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';

export default function UserProfile() {
    const [username, setUsername] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [email, setEmail] = useState(null);
    const [Passport, setPassport] = useState("")
    
    const [errorusername, setErrorusername] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [erroremail, setErroremail] = useState("");
    const [errorPassport, setErrorPassport] = useState("");

    const [alert, setAlert] = useState(false);
    const [succ, setSucc] = useState(false);
    const [msg, setMsg] = useState("");



    const bool = false;

    const onSubmit = function (e) {
        e.preventDefault()
        const data = {
            "username": username,
            "FirstName": FirstName,
            "LastName":LastName,
            "email": email,
            "Passport":Passport,
            }

        if (!username)
            setErrorusername("This field is required");
        if (!FirstName)
            setErrorFirstName("This field is required");
        if (!LastName)
            setErrorLastName("This field is required");
        if (!email)
            setErroremail("This field is required");
        if (!Passport)
            setErrorPassport("This field is required");
        
        if (username && FirstName && LastName && email && Passport) {
            
            // result => {
            //     setSucc(result.data.success);
            //     setMsg(result.data.msg)
            //     setAlert(true);

            // }

        }
        setAlert(false);

        

    }
    return (

        <div style={{margin:"auto", marginTop:"100px", height:"500px" }}>   
            
            <div style={{margin:"auto",backgroundColor:"#142F43",width:"640px",height:"80px",textAlign:"center",boxShadow:"px #999999"}}>
                <h1 style={{color:"whitesmoke",padding:"20px"}}>Edit Profile</h1>
            </div> 
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                width="600px"
                padding="20px"
                style={{ background: "#F7F7F7" ,borderRaduis:"10%",boxShadow:"2px auto #999999"}}
                display="inline-block"
                
            >
                        <TextField
                            required
                            onChange={function (e) {
                                setUsername(e.target.value);
                                setErrorusername(e.target.value ? "" : "This field is required");
                            }
                            }
                            id="outlined-required"
                            label="Username"
                            type="String"
                            error={errorusername ? true : false}
                            helperText={errorusername}
                        />

                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    onChange={function (e) {
                        setFirstName(e.target.value);
                        setErrorFirstName(e.target.value ? "" : "This field is required");
                    }
                    }
                    type="String"
                    error={errorFirstName ? true : false}
                    helperText={errorFirstName}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    onChange={function (e) {
                        setErrorLastName(e.target.value);
                        setErrorLastName(e.target.value ? "" : "This field is required");
                    }
                    }
                    type="String"
                    error={errorLastName ? true : false}
                    helperText={errorLastName}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    onChange={function (e) {
                        setErroremail(e.target.value);
                        setErroremail(e.target.value ? "" : "This field is required")
                    }}
                    type="String"
                    error={erroremail ? true : false}
                    helperText={erroremail}
                />
                 <TextField
                    required
                    id="outlined-required"
                    label="Passport"
                    onChange={function (e) {
                        setPassport(e.target.value);
                        setErrorPassport(e.target.value ? "" : "This field is required")
                    }}
                    type="Number"
                    error={errorPassport ? true : false}
                    helperText={errorPassport}
                />
              
                               
                <br />
                <Stack direction="row" spacing={1} >
                    <Button style={{textAlign:"center",marginLeft:"auto"}} variant="contained" onClick={onSubmit} href="/createFlight">Submit </Button>
                    <Button style={{margin:"auto"}} variant="outlined" href="/">Back </Button>
                </Stack>
                <br />

                {alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}

            </Box>
        </div>
    );
}