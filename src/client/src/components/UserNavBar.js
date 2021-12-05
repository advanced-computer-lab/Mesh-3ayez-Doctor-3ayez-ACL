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
import { useHistory } from 'react-router-dom';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Dashboard', 'Logout'];



const UserNavBar = (props) => {
  const colors = require("../colors")

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
    history.push('/user/reservations');
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
                  <Typography textAlign="center">{page}</Typography>
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

          {props.user &&
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
                  <Typography textAlign="center" onClick={onClickProfile} >Profile </Typography>
                </MenuItem>
                <MenuItem key="Dashboard" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={onClickDash}>Dashboard </Typography>
                </MenuItem>

              </Menu>
            </Box>}
          {!props.user && <Box sx={{ flexGrow: 0 }}>
            <Button textAlign="center" onClick={() => props.onLogin(true)}>Login</Button>
            <Button textAlign="center" >Sign up </Button>

          </Box>

          }

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default UserNavBar;
