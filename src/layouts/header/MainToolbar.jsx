import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { Logout, Notifications, HelpOutline } from '@mui/icons-material';
import icesi_logo from '/src/assets/images/ICESI_logo.png';
import otro_logo from '/src/assets/images/ICESI_logo.png';

export default function MainToolbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#64b5f6', borderRadius: 3 }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img src={icesi_logo} alt="Icesi Logo" height="40px" />
          <Box mx={1}>
            <div style={{ borderLeft: '1px solid #FFF', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
          </Box>
          <img src={otro_logo} alt="Otro Logo" height="40px" />
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
          <Button color="inherit" sx={{ marginRight: 2 }}>
            Plantas
          </Button>
          <Button color="inherit" sx={{ marginRight: 2 }}>
            Alarmas
          </Button>
          <Button color="inherit">
            Gráficas
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
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
