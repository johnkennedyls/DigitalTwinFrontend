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
import logobioinc from '../../assets/logo_bioinc.png';
import './MainToolbar.css';

// import { hasAnyRole } from "./services/utils/funtions";

export default function MainToolbar () {
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
    // window.localStorage.removeItem('access_token');
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <AppBar position="static" className="appBar">
      <Toolbar>
        <Box className="logoBox">
          <img src={icesiLogo} alt="Icesi Logo" className="logo" />
          <Box className="separatorBox">
            <div className="separator" />
          </Box>
          <img src={logobioinc} alt="Otro Logo" className="logo enlarged" />
        </Box>
        <Box className="buttonBox">
          <Button color="inherit" className="button" onClick={plantNavigate}>
            Plantas
          </Button>
          <Button color="inherit" className="button" onClick={processNavigate}>
            Procesos
          </Button>
          <Button color="inherit" className="button" onClick={typeAlarmNavigate}>
            Tipos de Alarmas
          </Button>
          <Button color="inherit" className="button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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
              <Button color="inherit" className="button" onClick={alarmNavigate}>
                Alarmas Activas
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Button color="inherit" className="button" onClick={plantNavigate}>
                Historial de Alarmas
              </Button>
            </MenuItem>
          </Menu>
          <Button color="inherit" className="button" onClick={chartNavigate}>
            Lienzos
          </Button>
        </Box>
        <Box className="iconBox">
          <IconButton edge="end" color="inherit" aria-label="logout" onClick={logout}>
            <Logout />
          </IconButton>
          {/* <IconButton edge="end" color="inherit" aria-label="notifications">
            <Notifications />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="help">
            <HelpOutline />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
    </>
  );
}
