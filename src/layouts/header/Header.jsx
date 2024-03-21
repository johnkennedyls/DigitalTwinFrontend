import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Container, AppBar,
  Toolbar, Box, Menu, MenuItem, IconButton
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import icesiLogo from '../../assets/images/ICESI_logo.png';
import logobioinc from '../../assets/images/logo_bioinc.png';

export default function Header () {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, alignItems: 'center' }}>
            <img src={icesiLogo} alt="Icesi Logo" style={{ height: '40px' }}/>
            <div style={{ marginLeft: '5px', marginRight: '5px', height: '30px', borderLeft: '1px solid #fff' }}/>
            <img src={logobioinc} alt="Otro Logo" style={{ height: '40px' }}/>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'flex', md: 'none', marginLeft: 10 } }}>
              <img src={icesiLogo} alt="Icesi Logo" style={{ height: '40px' }}/>
              <div style={{ marginLeft: '5px', marginRight: '5px', height: '30px', borderLeft: '1px solid #fff' }}/>
              <img src={logobioinc} alt="Otro Logo" style={{ height: '40px' }}/>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-plant')}>
                Plants
              </MenuItem>
              <MenuItem color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-process')}>
                Process
              </MenuItem>
              <MenuItem color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-type-alarm')}>
                Alarm Types
              </MenuItem>
              <MenuItem color="inherit" sx={{ marginRight: '0.5rem' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Alarms
              </MenuItem>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/navegator-alarm-active')}>
                  Active Alarms
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-plant')}>
                  Alarms History
                  </Button>
                </MenuItem>
              </Menu>
              <MenuItem color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-charts')}>
                Canvas
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              left: { md: '60%', lg: '50%' },
              transform: 'translateX(-50%)'
            }}
          >
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-plant')}>
              Plants
            </Button>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-process')}>
              Process
            </Button>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-type-alarm')}>
              Alarm Types
            </Button>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Alarms
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/navegator-alarm-active')}>
                  Active Alarms
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-plant')}>
                  Alarms History
                </Button>
              </MenuItem>
            </Menu>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={(e) => navigate(e, '/manage-charts')}>
              Canvas
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton edge="end" color="inherit" aria-label="logout" onClick={logout}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
