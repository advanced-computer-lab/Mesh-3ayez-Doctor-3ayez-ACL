import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Box } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MenuItem from '@mui/material/MenuItem';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { withStyles } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const colors = require("../colors.js");


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
function UserSearch(props) {
    const location = useLocation();
    const [from, setFrom] = React.useState(location.state && location.state.searchInputs ? location.state.searchInputs["from"] : '');
    const [to, setTo] = React.useState(location.state && location.state.searchInputs ? location.state.searchInputs["to"] : '');
    const d1 = new Date();
    const date = location.state && location.state.searchInputs ? location.state.searchInputs["return_date"] : { year: d1.getFullYear(), month: d1.getMonth() + 1, day: d1.getDate() };
    const [arrival_date, setArrivalTime] = React.useState(date);
    const date2 = location.state && location.state.searchInputs ? location.state.searchInputs["departure_date"] : { year: d1.getFullYear(), month: d1.getMonth() + 1, day: d1.getDate() };
    const [departure_date, setDepartureTime] = React.useState(date2);
    const [number_of_passengers, setPassengers] = React.useState(location.state && location.state.searchInputs ? location.state.searchInputs["number_of_passengers"] : '');
    const [cabin_type, setCabin] = React.useState(location.state && location.state.searchInputs ? location.state.searchInputs["cabin_type"] : '');
    const classes = useStyles()
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMessage]=React.useState("");
    const handleClick = () => {
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleSearch = () => {

        const data = {
            "from": from,
            "to": to,
            "return_date": arrival_date,
            "departure_date": departure_date,
            "cabin_type": cabin_type,
            "number_of_passengers": number_of_passengers
        }

        axios.post("http://localhost:8000/api/flights/user_search_flights", data, { "Content-Type": "application/json" })
            .then(result => {
                if(result.status==200){
                    const path="searchResults"
                history.push({
                    pathname: `/user/${path}`, state:
                    {
                        flights: result.data,
                        cabin_type: cabin_type,
                        number_of_passengers: number_of_passengers,
                        searchInputs: data,
                        // user:props.user

                    }
                });
                history.go();}
               
            })
            .catch(err => {console.log(err)
                setOpen(true);
                setErrorMessage(err.response.data.msg);
            });
    }
    return (
        <div>
            <Box style={{ position: props.position }} className="box" sx={{ '& > :not(style)': { m: 1, width: "18ch", marginTop: "20px", textAlign: "center" } }}>
                <TextField
                    id="input-with-icon-textfield"
                    label="From"
                    value={from}
                    className={classes.root}
                    InputProps={{

                        startAdornment: (
                            <InputAdornment position="start">
                                <FlightTakeoffIcon />
                            </InputAdornment>
                        ),
                    }}

                    onChange={function (e) {
                        setFrom(e.target.value)
                    }}
                    varient="outlined"
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="To"
                    value={to}
                    className={classes.root}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FlightLandIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={function (e) {
                        setTo(e.target.value)
                    }}
                    varient="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Departure date"
                        value={new Date(departure_date.year, departure_date.month - 1, departure_date.day)}
                        onChange={(newValue) => {
                            if(newValue && (newValue.getDate()+1) && (newValue.getMonth()+1) && (newValue.getFullYear()+1))
                            {
                                setDepartureTime({ year: newValue.getFullYear(), month: newValue.getMonth() + 1, day: newValue.getDate() });
                            }
                        }}

                        renderInput={(params) => <TextField {...params} className={classes.root}
                            InputLabelProps={{ shrink: true, }} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Return date"
                        value={new Date(arrival_date.year, arrival_date.month - 1, arrival_date.day)}

                        onChange={(newValue) => {
                            if(newValue && (newValue.getDate()+1) && (newValue.getMonth()+1) && (newValue.getFullYear()+1))
                            {
                                setArrivalTime({ year: newValue.getFullYear(), month: newValue.getMonth() + 1, day: newValue.getDate() });
                            }
                        }}
                        renderInput={(params) => <TextField {...params} className={classes.root}
                            InputLabelProps={{ shrink: true, }} />}
                    />
                </LocalizationProvider>

                <TextField
                    id="input-with-icon-textfield"
                    label="Passengers"
                    type="number"
                    value={number_of_passengers}
                    className={classes.root}
                    onChange={(e) => {
                        setPassengers(e.target.value);
                    }
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FamilyRestroomIcon />
                            </InputAdornment>
                        ),
                    }}
                    varient="outlined"
                />
                <FormControl >
                    {/* <InputLabel id="demo-simple-select-label" >Cabin</InputLabel> */}
                    <TextField
                        value={cabin_type}
                        label="Cabin"
                        className={classes.root}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BusinessCenterIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => {
                            setCabin(e.target.value);
                        }
                        }
                        select>
                        <MenuItem value={"economy"}>economy</MenuItem>
                        <MenuItem value={"business"}>business</MenuItem>
                        <MenuItem value={"first"}>first</MenuItem>
                    </TextField>
                </FormControl>
                    <Button style={{
                        borderRadius: 5,
                        backgroundColor: colors.c1,
                        marginTop: "25px",
                    }} variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}  >Search</Button>
                    <Stack width="100%">
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            {errorMsg}
                        </Alert>
                    </Snackbar>
                    </Stack>

            </Box>

        </div>
    )
}
export default UserSearch
