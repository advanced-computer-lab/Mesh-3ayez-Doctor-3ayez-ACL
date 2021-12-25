import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from './flight.png'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Login from './Login';
import Singup from './Signup';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Dashboard', 'Logout'];
const flag = false;
const UserNavBar = (props) => {
  const colors = require("../colors")
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(localStorage.user && true);
  const [openLog, setOpenLog] = useState(false);
  const [openSign, setOpenSign] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const history = useHistory()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNavToHome = () => {
    history.push('/');
  }
  const onClickProfile = () => {
    history.push('/user/profile');
  }
  const onClickDash = () => {
    history.push('/user/reservation');
  }
  function handleLogout() {
    localStorage.clear();
    handleCloseUserMenu();
  }
  function handleCloseLog() {
    setOpenLog(false);
  }
  function handleCloseSign() {
    setOpenSign(false);
  }
  function handleClickLog() {
    setOpenLog(true);
    setOpenSign(false);

  }
  function handleClickSign() {
    setOpenSign(true);
    setOpenLog(false);

  }

  return (
    <AppBar position="static" style={{ backgroundColor: colors.c1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={27}>

            <Box gridColumn="span 2" sx={{ height: '8vh', display: "flex", textAlign: "center", margin: "auto" }} >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleNavToHome}
                color="inherit"
                variant="h6"
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex', width: "50px", height: "50px" } }}
              >
                <Avatar alt="Remy Sharp" src={logo} sx={{ width: "40px", height: "40px" }} />
                <Typography style={{ textAlign: "center", margin: "auto" }} fontWeight="bold" color="white" onclick={handleNavToHome}>TIJWAL</Typography>

              </IconButton>

            </Box>

            <Box gridColumn="span 10" sx={{ height: '8vh', textAlign: "center", margin: "auto" }} >
              {localStorage.getItem("token") &&
                <Box sx={{ flexGrow: 0, textAlign: "center", margin: "auto" }}>
                  <Tooltip title="Open settings">
                    <IconButton style={{ paddingTop: "12%" }} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="U" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >

                    <MenuItem key="Profile" onClick={handleCloseNavMenu}>
                      <Button style={{ textAlign: "center", color: colors.c1 }} href='/user/profile' >Profile </Button>
                    </MenuItem>
                    <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
                      <Button style={{ textAlign: "center", color: colors.c1 }} href='/user/reservation'>Dashboard </Button>
                    </MenuItem>
                    <MenuItem key="Logout" onClick={handleCloseNavMenu}>
                      <Button style={{ textAlign: "center", color: colors.c1 }} onClick={handleLogout}>Logout </Button>
                    </MenuItem>
                  </Menu>
                </Box>}

              {!localStorage.getItem("token") && <Box sx={{ flexGrow: 0, textAlign: "center", margin: "auto" }}>
                <Button style={{ paddingTop: "10%", color: "white" }} onClick={handleClickLog}>Login</Button>
                <Button style={{ paddingTop: "10%", margin: "auto", color: "white" }} onClick={handleClickSign} >Sign up </Button>


              </Box>

              }

            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={openLog}
        onClose={handleCloseLog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
                    </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Login signClick={handleClickSign} handleClose={handleCloseLog}></Login>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSign}
        onClose={handleCloseSign}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
                    </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Singup logClick={handleClickLog} handleClose={handleCloseSign}></Singup>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};
export default withStyles()(UserNavBar);