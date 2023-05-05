import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import icesi_logo_black from '/src/assets/images/ICESI_logo_black.png';
import './WelcomeLayout.css';

const WelcomeLayout = () => {
  

  const [logoWidth, setLogoWidth] = useState(null);
  const titleRef = useRef();
  
  useEffect(() => {
    if (titleRef.current) {
      setLogoWidth(titleRef.current.offsetWidth);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/chart';
  };

  return (
    <Box className={"container"}>
    {logoWidth && (
      <div className="fade-in" style={{ width: logoWidth }}>
        <img
          src={icesi_logo_black}
          alt="Logo de la Universidad"
          style={{ width: '100%', height: 'auto', marginBottom: '2.5rem', marginTop: '10rem' }}
        />
      </div>
    )}
    <div className="fade-in">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className={"title"}
        ref={titleRef}
      >
        Bienvenido a la Planta Piloto<br/>Ingeniería Bioquímica
      </Typography>
    </div>
    <div className="scale-in">
      <Button
        variant="contained"
        className={"button"}
        onClick={handleLogin}
        startIcon={<LoginIcon className={"icon"}/>}
        sx={{
          marginTop: '1rem',
        }} 
      >
        Iniciar sesión
      </Button>
    </div>
     
    </Box>
  );
};

export default WelcomeLayout;