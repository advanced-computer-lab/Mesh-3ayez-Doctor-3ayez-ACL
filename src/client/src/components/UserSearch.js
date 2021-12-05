import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Box } from '@mui/system';
import { fabClasses, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserSearchResults from './UserSearchResults.js';
import { useSelector,useDispatch } from 'react-redux';
import {setFlights} from '../redux/flightSearchSlice'
import { Redirect } from 'react-router';
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
const flights = {};
function UserSearch(props) {

    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
    const [arrival_date, setArrivalTime] = React.useState(new Date());
    const [departure_date, setDepartureTime] = React.useState(new Date());
    const [number_of_passengers, setPassengers] = React.useState('');
    const [cabin_type, setCabin] = React.useState('');
    const [searched, setSearched ] = React.useState(props.searched);
    const classes= useStyles()
    const dispatch = useDispatch();
    const handleSearch = () => {

        const data = {
            "from": from,
            "to": to,
            "return_date": arrival_date,
            "departure_date": departure_date,
            "cabin_type": cabin_type,
            "number_of_passengers": number_of_passengers
        }
        console.log(data)
        axios.post("http://localhost:8000/api/flights/user_search_flights", data, { "Content-Type": "application/json" })
            .then(result => {
                dispatch(setFlights(result.data));
                console.log(result.data);
                setSearched(true);
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            {!searched&& <Box className="box" sx={{ '& > :not(style)': { m: 1, width: "18ch", marginTop: "20px", textAlign: "center" } }}>
                <TextField
                    id="input-with-icon-textfield"
                    label="From"
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
                        value={departure_date}
                        onChange={(newValue) => {
                            setDepartureTime(newValue);
                        }}

                        renderInput={(params) => <TextField {...params} className={classes.root}
                            InputLabelProps={{ shrink: true, }} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Arrival date"
                        value={arrival_date}

                        onChange={(newValue) => {
                            setArrivalTime(newValue);
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
            </Box>}
            {searched&&<Redirect to='/searchResults'/>}
        </div>
    )
}
export default UserSearch
