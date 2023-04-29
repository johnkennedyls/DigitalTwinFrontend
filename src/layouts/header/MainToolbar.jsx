import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Notifications from '@mui/icons-material/Notifications';
import HelpOutline from '@mui/icons-material/HelpOutline';

import icesi_logo from '/src/assets/images/ICESI_logo.png';
import otro_logo from '/src/assets/images/ICESI_logo.png';
import './MainToolbar.css';

export default function MainToolbar() {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Box className="logoBox">
          <img src={icesi_logo} alt="Icesi Logo" className="logo" />
          <Box className="separatorBox">
            <div className="separator" />
          </Box>
          <img src={otro_logo} alt="Otro Logo" className="logo" />
        </Box>
        <Box className="buttonBox">
          <Button color="inherit" className="button">
            Plantas
          </Button>
          <Button color="inherit" className="button">
            Alarmas
          </Button>
          <Button color="inherit" className="button">
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
