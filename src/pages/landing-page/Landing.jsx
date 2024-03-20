import { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useHistory } from 'react-router-dom';

import icesiLogoBlack from '../../assets/images/ICESI_logo_black.png';
import { useIncrementalIndexEffect } from '../../utils/UseIncrementalIndexEffect';

const Landing = () => {
  const saamfiUrl = import.meta.env.VITE_SAAMFI_FRONTEND_URL;

  const [logoWidth, setLogoWidth] = useState(null);
  const titleRef = useRef();

  const currentIndex = useIncrementalIndexEffect(3, 150);

  const history = useHistory();

  useEffect(() => {
    if (titleRef.current) {
      setLogoWidth(titleRef.current.offsetWidth);
    }
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('access_token', token);
      history.push('/manage-plant');
    }
  }, []);

  const handleLogin = () => {
    window.location.href = saamfiUrl;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      {logoWidth &&
        <Fade in={currentIndex >= 1} timeout={1000}>
          <div className="fade-in" style={{ width: logoWidth }}>
            <img
              src={icesiLogoBlack}
              alt="Logo de la Universidad"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </Fade>
      }
      <Fade in={currentIndex >= 2} timeout={1000}>
        <Typography ref={titleRef}variant="h4" component="h1" gutterBottom
          sx={{
            textAlign: 'center',
            marginBottom: '1rem'
          }}
        >
          Bienvenido a la Planta Piloto<br/>Ingeniería Bioquímica
        </Typography>
      </Fade>
      <Fade in={currentIndex >= 3} timeout={1000}>
        <Button
          variant="contained"
          onClick={handleLogin}
          startIcon={<LoginIcon sx={{ marginRight: '0.5rem' }}/>}
          sx={{
            marginTop: '1rem'
          }}
        >
        Iniciar sesión
        </Button>
      </Fade>
    </Box>
  );
};

export default Landing;
