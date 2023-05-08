import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const EditPlant = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [conventionType, setConventionType] = useState('');
  const [conventionValue, setConventionValue] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleConventionTypeChange = (event) => {
    setConventionType(event.target.value);
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
Editar Planta
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nombre planta"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ width: '100%', my: 1 }}
        />
        <TextField
          label="Descripcion"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          rows={4}
          sx={{ width: '100%', my: 1 }}
        />
        <Box sx={{ width: '100%', my: 1 }}>
        
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="image-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-input">
                    
            <Button variant="contained" component="span" sx={{ mr: 1 }}>
                
              Seleccionar imagen planta
            </Button>
          </label>
          {image && (
            <Button variant="outlined" onClick={handleDeleteImage}>
              Borrar imagen
            </Button>
          )}
        </Box>
        {image && (
          <Box sx={{ width: '100%', my: 1 }}>
            <Typography variant="body1" gutterBottom>
              Image preview:
            </Typography>
            <img src={URL.createObjectURL(image)} alt="Plant" width="200" height="200" />
          </Box>
        )}
        
        <TextField
          label="Convenciones"
          value={conventionValue}
          onChange={(event) => setConventionValue(event.target.value)}
          sx={{ width: '100%', my: 1 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Agregar planta
        </Button>
      </Box>
    </Container>
  );
};

export default EditPlant;