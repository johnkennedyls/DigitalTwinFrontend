import { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import { useHistory } from 'react-router-dom'

import icesiLogoBlack from './assets/images/ICESI_logo_black.png'

import './WelcomeLayout.css'

const WelcomeLayout = () => {
  const saamfiUrl = import.meta.env.VITE_SAAMFI_FRONTEND_URL

  const [logoWidth, setLogoWidth] = useState(null)
  const titleRef = useRef()

  const history = useHistory()

  useEffect(() => {
    if (titleRef.current) {
      setLogoWidth(titleRef.current.offsetWidth)
    }
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('access_token', token)
      history.push('/manage-plant')
    }
  }, [])

  const handleLogin = () => {
    window.location.href = saamfiUrl
  }

  return (
    <Box className={'container'}>
    {logoWidth && (
      <div className="fade-in" style={{ width: logoWidth }}>
        <img
          src={icesiLogoBlack}
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
        className={'title'}
        ref={titleRef}
      >
        Bienvenido a la Planta Piloto<br/>Ingeniería Bioquímica
      </Typography>
    </div>
    <div className="scale-in">
      <Button
        variant="contained"
        className={'button'}
        onClick={handleLogin}
        startIcon={<LoginIcon className={'icon'}/>}
        sx={{
          marginTop: '1rem'
        }}
      >
        Iniciar sesión
      </Button>
    </div>

    </Box>
  )
}

export default WelcomeLayout
