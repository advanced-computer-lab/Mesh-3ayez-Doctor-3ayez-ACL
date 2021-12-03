import FOG from 'vanta/dist/vanta.fog.min'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from "three";
import * as React2 from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicAlert from "./BasicAlert";
import Stack from '@mui/material/Stack';
import { Hidden } from '@mui/material';

export default function UserProfile(probs) {
    const id = probs.id;
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(FOG({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 754.00,
                minWidth: 200.00,
                highlightColor: 0xb57a65,
                midtoneColor: 0x4100ff,
                lowlightColor: 0xb2ade2,
                baseColor: 0xffffff
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    const [username, setUsername] = useState(probs.username)
    const [FirstName, setFirstName] = useState(probs.FirstName)
    const [LastName, setLastName] = useState(probs.LastName)
    const [email, setEmail] = useState(probs.email);
    const [Passport, setPassport] = useState(probs.Passport)

    const [errorusername, setErrorusername] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [erroremail, setErroremail] = useState("");
    const [errorPassport, setErrorPassport] = useState("");

    const [alert, setAlert] = useState(false);
    const [succ, setSucc] = useState(false);
    const [msg, setMsg] = useState("");

    const onSubmit = function (e) {
        e.preventDefault()
        const data = {
            "username": username,
            "FirstName": FirstName,
            "LastName": LastName,
            "email": email,
            "Passport": Passport,
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
            axios.put("http://localhost:8000/api/users/" + id, data, { "Content-Type": "application/json" })
                .then(result => {
                    setSucc(result.data.success);
                    setMsg(result.data.msg)
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
                <div id = 'box' style={{  margin: "auto", marginTop: "100px", backgroundColor: "#142F43", width: "640px", height: "80px", textAlign: "center", boxShadow: "px #999999" }}>
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
                        <TextField
                            required
                            onChange={function (e) {
                                setUsername(e.target.value);
                                setErrorusername(e.target.value ? "" : "This field is required");
                            }}
                            value={username}
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
                            value={FirstName}
                            type="String"
                            error={errorFirstName ? true : false}
                            helperText={errorFirstName}

                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            onChange={function (e) {
                                setLastName(e.target.value);
                                setErrorLastName(e.target.value ? "" : "This field is required");
                            }
                            }
                            value={LastName}
                            type="String"
                            error={errorLastName ? true : false}
                            helperText={errorLastName}

                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            onChange={function (e) {
                                setEmail(e.target.value);
                                setErroremail(e.target.value ? "" : "This field is required")
                            }}
                            value={email}
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
                            value={Passport}
                            type="Number"
                            error={errorPassport ? true : false}
                            helperText={errorPassport}
                        />


                        <br />
                        <Stack direction="row" spacing={1} >
                            <Button style={{ textAlign: "center", marginLeft: "auto" }} variant="contained" onClick={onSubmit} href="/">Submit </Button>
                            <Button style={{ margin: "auto" }} variant="outlined" href="/">Back </Button>
                        </Stack>
                        <br />
			{alert && <BasicAlert severity={succ ? "success" : "error"} msg={msg} />}


                    </Box>
                </div>
            </div>
        </div>
    );
}