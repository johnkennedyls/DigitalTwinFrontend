import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { Menu, MenuItem } from '@mui/material';

import icesiLogo from '../../assets/images/ICESI_logo.png';
import logobioinc from '../../assets/images/logo_bioinc.png';

export default function Header () {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const plantNavigate = (e) => {
    e.preventDefault();
    history.push('/manage-plant');
  };

  const processNavigate = (e) => {
    e.preventDefault();
    history.push('/manage-process');
  };

  const typeAlarmNavigate = (e) => {
    e.preventDefault();
    history.push('/manage-type-alarm');
  };

  const alarmNavigate = (e) => {
    e.preventDefault();
    history.push('/navegator-alarm-active');
  };

  const chartNavigate = (e) => {
    e.preventDefault();
    history.push('/manage-charts');
  };

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <AppBar position="static" sx={{ bgColor: '#64b5f6', borderRadius: '3px' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={icesiLogo} alt="Icesi Logo" style={{ height: '40px' }}/>
            <Box sx={{ marginX: '1rem' }}>
              <div style={{ marginX: '5px', height: '30px', borderLeft: '1px solid #fff' }}/>
            </Box>
            <img src={logobioinc} alt="Otro Logo" style={{ height: '90px' }}/>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={plantNavigate}>
            Plantas
            </Button>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={processNavigate}>
            Procesos
            </Button>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={typeAlarmNavigate}>
            Tipos de Alarmas
            </Button>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Alarmas
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={alarmNavigate}>
                Alarmas Activas
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={plantNavigate}>
                Historial de Alarmas
                </Button>
              </MenuItem>
            </Menu>
            <Button color="inherit" sx={{ marginRight: '0.5rem' }} onClick={chartNavigate}>
            Lienzos
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="end" color="inherit" aria-label="logout" onClick={logout}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
