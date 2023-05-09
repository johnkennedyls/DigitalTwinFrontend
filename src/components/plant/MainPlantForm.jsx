import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const MainPlantForm = () => {
  const [plant, setPlant] = useState({ name: '', description: '', image: null });
  const [crop, setCrop] = useState({ aspect: 1, width: 100 });
  const [src, setSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({ ...plant, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCrop = async (crop) => {
    if (!src || !crop.width || !crop.height) {
      return;
    }

    const croppedImageUrl = await getCroppedImage(src, crop);
    setCroppedImageUrl(croppedImageUrl);
    setPlant({ ...plant, image: croppedImageUrl });
  };


  const getCroppedImage = (imageSrc, crop) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        canvas.toBlob((blob) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        }, 'image/jpeg');
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(plant);
    // Aquí puedes enviar los datos del formulario a tu backend, si es necesario.
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Agregar planta
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="name"
              value={plant.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descripción"
              name="description"
              value={plant.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <label htmlFor="image-upload">
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                Cargar imagen
              </Button>
            </label>
            {src && (
              <>
                <h1>HOLAAAAA</h1>
                <ReactCrop
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={handleImageCrop}
                  style={{ marginTop: 16 }}
                >
                  <img src={src}></img>
                </ReactCrop>
              </>

            )}
            {croppedImageUrl && (
              <img
                src={croppedImageUrl}
                alt="Vista previa de la imagen de la planta"
                style={{
                  maxWidth: '100%',
                  marginTop: 16,
                  objectFit: 'cover',
                }}
              />
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
              Agregar planta
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );




};

export default MainPlantForm;