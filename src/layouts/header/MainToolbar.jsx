import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Notifications from '@mui/icons-material/Notifications';
import HelpOutline from '@mui/icons-material/HelpOutline';
import { Menu,MenuItem,Link} from '@mui/material';
import icesi_logo from '/src/assets/images/ICESI_logo.png';
import logobioinc from '/src/assets/logo_bioinc.png';
import './MainToolbar.css';

import { hasAnyRole } from "/src/services/utils/funtions";

export default function MainToolbar() {
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Box className="logoBox">
          <img src={icesi_logo} alt="Icesi Logo" className="logo" />
          <Box className="separatorBox">
            <div className="separator" />
          </Box>
          <img src={logobioinc} alt="Otro Logo" className="logo" />
        </Box>
        <Box className="buttonBox">
          <Button color="inherit" className="button" href={`${publicUrl}/manage-plant`}>
            Plantas
          </Button>
          <Button color="inherit" className="button" href={`${publicUrl}/manage-process`}>
            Procesos
          </Button>
          <Button color="inherit" className="button" href={`${publicUrl}/manage-type-alarm`}>
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
              <Button color="inherit" className="button" href={`${publicUrl}/navegator-alarm-active`}>
                Alarmas Activas
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Button color="inherit" className="button" href={`${publicUrl}/navegator-alarm-history`}>
                Historial de Alarmas
              </Button>
            </MenuItem>
          </Menu>
          <Button color="inherit" className="button" href={`${publicUrl}/manage-charts`}>
            Gráficas
          </Button>
        </Box>
        <Box className="iconBox">
          <IconButton edge="end" color="inherit" aria-label="logout">
            <Logout />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="notifications">
            <Notifications />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="help">
            <HelpOutline />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
