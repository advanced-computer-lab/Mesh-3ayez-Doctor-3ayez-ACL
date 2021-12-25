import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
const colors = require('../../colors');
export function ResetPassword(props) {
    const [usernameErr, setUsernameErr] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState("");

    const [emailErr, setEmailErr] = useState(false);
    const [emailMsg, setEmailMsg] = useState("");
    const [msg, setMsg] = useState("");
    const [fB, setFB] = useState(false);
    const [color, setColor] = useState("red");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get('u_email'),
            username: data.get('u_username'),
        };
        axios.post("https://localhost:8000/api/user/forget_password", user).then(
            res => {
                setMsg(res.data.msg);
                setColor("green");
            }
        ).catch(err => {
            setMsg(err.response.data.msg);
            setColor("red");
        });
        setFB(true);
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xs">
                <Paper elevation={4} >
                    <Box style={{ margin: "15% 0" }} component="form" noValidate onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, height: '60vh' }}>
                        <div >
                            <ErrorOutlineIcon style={{ margin: "10% 0" }} color="primary" fontSize="large" />
                        </div>
                        <div><TextField
                            required
                            label="Email"
                            id="u_email"
                            name="u_email"
                            autoFocus
                            error={emailErr}
                            helperText={emailMsg}
                            onChange={function (e) {
                                if (e.target.value) {
                                    setEmailErr(false);
                                    setEmailMsg("");

                                } else {
                                    setEmailErr(true);
                                    setEmailMsg("Email is required");
                                }

                            }
                            }
                        />
                        </div>
                        <div> <TextField
                            required
                            id="u_username"
                            name="u_username"
                            label="Username"
                            error={usernameErr}
                            helperText={usernameMsg}
                            onChange={function (e) {
                                if (e.target.value) {
                                    setUsernameErr(false);
                                    setUsernameMsg("");

                                } else {
                                    setUsernameErr(true);
                                    setUsernameMsg("Username is required");
                                }

                            }
                            }
                        />
                        </div>

                        <div><Button
                            style={{
                                borderRadius: 5,
                                backgroundColor: colors.c1
                            }}
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password.
                        </Button></div>

                        <div>
                            {fB ? <FormControl><Typography style={{ color: color }}>{msg}</Typography></FormControl> : null}
                        </div>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}