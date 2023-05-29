import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Avatar } from '@mui/material';

import 'react-image-crop/dist/ReactCrop.css';
import ImageIcon from '@mui/icons-material/Image';

import PropTypes from "prop-types";


const MainPlantForm = ({ onNext, plantName = '', plantDescription = '', plantPhoto = null }) => {
  const [plant, setPlant] = useState({ plantName: plantName, plantDescription: plantDescription, plantPhoto: plantPhoto });

  useEffect(() => {
    setPlant({ plantName: plantName, plantDescription: plantDescription, plantPhoto: plantPhoto })
  }, [plantName, plantDescription, plantPhoto])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({ ...plant, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPlant({ ...plant, plantPhoto: reader.result });
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    onNext(plant)
    e.preventDefault();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={6}>
        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Agregar planta
          </Typography>
          <Avatar src={plant.plantPhoto} variant="rounded" style={{ width: '7vw', height: '7vw', margin: '15px auto' }} />
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="plantName"
              value={plant.plantName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descripción"
              name="plantDescription"
              value={plant.plantDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload"> {/* Añadir etiqueta y vincularla al input */}
              <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                Cargar imagen
              </Button>
            </label>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
              Siguiente
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

MainPlantForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  plantName: PropTypes.string,
  plantDescription: PropTypes.string,
  plantPhoto: PropTypes.string,
};

export default MainPlantForm;