import { useEffect, useState } from 'react'
import { Button, TextField, Grid, Paper, Typography, Avatar } from '@mui/material'
import 'react-image-crop/dist/ReactCrop.css'
import ImageIcon from '@mui/icons-material/Image'
import PropTypes from 'prop-types'

const MainPlantForm = ({ onNext, plantName = '', plantDescription = '', plantPhoto = null, plantIp = '', plantSlot = '', processLabel = 'add' }) => {
  const [plant, setPlant] = useState({ plantName, plantDescription, plantPhoto, plantIp, plantSlot })
  const [valid, setValid] = useState(false)

  useEffect(() => {
    setPlant({ plantName, plantDescription, plantPhoto, plantIp, plantSlot })
  }, [plantName, plantDescription, plantPhoto, plantIp, plantSlot])
  // Elemento nombre de boton

  const handleChange = (e) => {
    const { name, value } = e.target
    setPlant({ ...plant, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setPlant({ ...plant, plantPhoto: reader.result })
    })
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    onNext(plant)
    e.preventDefault()
  }

  const isValid = () => {
    return plant.plantName !== '' && plant.plantDescription !== '' && plant.plantIp !== '' && plant.plantSlot !== '' && plant.plantPhoto !== null
  }

  useEffect(() => {
    setValid(isValid())
  }, [plant])

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={6}>
        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Typography variant="h6" gutterBottom>
            {processLabel === 'add' ? 'Agregar planta' : 'Editar planta'}
          </Typography>
          <Avatar src={plant.plantPhoto} variant="rounded" style={{ width: '7vw', height: '7vw', margin: '15px auto' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="image-upload">
              <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
              {processLabel === 'add' ? 'Cargar imagen' : 'Editar imagen'}

              </Button>
            </label>
            </div>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="plantName"
              value={plant.plantName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ margin: '30px 0' }}
            />
            <TextField
              label="Descripción"
              name="plantDescription"
              value={plant.plantDescription}
              onChange={handleChange}
              fullWidth
              multiline
              required
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              label="IP"
              name="plantIp"
              required
              value={plant.plantIp}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="SLOT"
              name="plantSlot"
              required
              value={plant.plantSlot}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <Button disabled={!valid} type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
              Siguiente
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

MainPlantForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  plantName: PropTypes.string,
  plantDescription: PropTypes.string,
  plantPhoto: PropTypes.string,
  plantIp: PropTypes.string,
  plantSlot: PropTypes.string,
  processLabel: PropTypes.string,
  nameButtom: PropTypes.string
}

export default MainPlantForm
