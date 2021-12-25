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
import logo from './TIJ (2).png'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useHistory} from'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Login from './Login';
import Singup from './Signup';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Dashboard', 'Logout'];
const flag=false;



const UserNavBar = (props) => {
  const colors = require("../colors")
  // console.log(JSON.parse(localStorage.getItem('user'))+'user')
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(localStorage.user&&true);
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
  function handleLogout(){
    localStorage.clear();
    handleCloseUserMenu();
  }
function handleCloseLog() {
    setOpenLog(false);
}
function handleCloseSign() {
  setOpenSign(false);
}
function handleClickLog(){
  setOpenLog(true);
  setOpenSign(false);

}
function handleClickSign(){
  setOpenSign(true);
  setOpenLog(false);

}

  return (
    <AppBar position="static" style={{ backgroundColor: colors.c1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleNavToHome}
            color="inherit"
            variant="h6"
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex', width: "60px", height: "60px" } }}
          >
            <Avatar alt="Remy Sharp" src={logo} sx={{ width: "60px", height: "60px" }} />

          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography style={{textAlign:"center"}}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                
              >
                {page}
              </Button>
            ))}
          </Box>

          {localStorage.getItem("token")&&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                  <Button style={{textAlign:"center"}} onClick={onClickProfile} >Profile </Button>
                </MenuItem>
                <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
                  <Button style={{textAlign:"center"}} onClick={onClickDash}>Dashboard </Button>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleCloseNavMenu}>
                  <Button style={{textAlign:"center"}} onClick={handleLogout}>Logout </Button>
                </MenuItem>
              </Menu>
            </Box>}
          {!localStorage.getItem("token")&& <Box sx={{ flexGrow: 0 }}>
            <Button style={{textAlign:"center"}} onClick={handleClickLog}>Login</Button>
            <Button style={{textAlign:"center"}} onClick={handleClickSign} >Sign up </Button>

          </Box>

          }

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
export default withStyles() (UserNavBar);