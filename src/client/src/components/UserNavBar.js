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
import {useHistory} from'react-router-dom';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Dashboard', 'Logout'];
const flag=false;



const UserNavBar = (props) => {
  const colors = require("../colors")
  // console.log(JSON.parse(localStorage.getItem('user'))+'user')
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(localStorage.user&&true);

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

  return (
    <AppBar position="static" style={{ backgroundColor: colors.c1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={27}>

<Box gridColumn="span 2" sx={{ height: '8vh',display:"flex",textAlign:"center", margin:"auto" }} >
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
          <Typography style={{textAlign:"center", margin:"auto"}} fontWeight="bold" color="white" onclick={handleNavToHome}>TIJWAL</Typography>

          </IconButton>   

</Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          </Box> */}
<Box gridColumn="span 10" sx={{ height: '8vh',textAlign:"center",margin:"auto" }} >
          {localStorage.getItem("token")&&
            <Box sx={{ flexGrow: 0 ,textAlign:"center",margin:"auto"}}>
              <Tooltip title="Open settings">
                <IconButton style={{paddingTop:"12%"}} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                  <Button style={{textAlign:"center",color:colors.c1}} onClick={onClickProfile} >Profile </Button>
                </MenuItem>
                <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
                  <Button style={{textAlign:"center",color:colors.c1}} onClick={onClickDash}>Dashboard </Button>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleCloseNavMenu}>
                  <Button style={{textAlign:"center",color:colors.c1}} onClick={handleLogout}>Logout </Button>
                </MenuItem>
              </Menu>
            </Box>}

          {!localStorage.getItem("token")&& <Box  sx={{ flexGrow: 0, textAlign:"center", margin:"auto" }}>
            <Button style={{paddingTop:"10%",color:"white"}} href='/login'>Login</Button>
            <Button style={{paddingTop:"10%", margin:"auto",color:"white"}} href='/signup' >Sign up </Button>

          </Box>

          }

</Box>
</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default (UserNavBar);