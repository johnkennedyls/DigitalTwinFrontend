import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';

const ImageDialog = ({ open, imageSrc, onAccept, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        <img src={imageSrc} style={{ width: '250px', height: '250px' }} alt="Image to crop" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onAccept}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

const ImageUploader = ({ onImageAccepted }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setOpen(true);
    });
    reader.readAsDataURL(file);
  };

  const handleAccepted = () => {
    onImageAccepted(imageSrc);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-upload">
        <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                    Load image
        </Button>
      </label>
      {imageSrc && (
        <ImageDialog
          open={open}
          imageSrc={imageSrc}
          onAccept={handleAccepted}
          onCancel={handleClose}
        >
        </ImageDialog>
      )}
    </Box>
  );
};
ImageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  imageSrc: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
ImageUploader.propTypes = {
  onImageAccepted: PropTypes.func.isRequired
};

export default ImageUploader;
