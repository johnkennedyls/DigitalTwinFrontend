import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

import { toCamelCase } from '../../utils/TextConverter';
import { ErrorAlert, SuccessAlert } from '../../utils/Alert';

function MetadataDialog ({ tagProperties, setTagProperties }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [metadata, setMetadata] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setMetadata('');
  };

  const handleChangeMetadata = (e) => {
    setMetadata(e.target.value);
  };

  const handleAddMetadata = () => {
    if (metadata) {
      if (!tagProperties.includes(toCamelCase(metadata))) {
        setTagProperties([...tagProperties, toCamelCase(metadata)]);
        setError(false);
        setMetadata('');
        SuccessAlert('Metadata agregada correctamente');
      } else {
        ErrorAlert('Ya existe una metadata con ese nombre');
        setError(true);
      }
    } else setError(true);
  };

  return (
        <>
            <Button variant="outlined" color="primary" onClick={handleOpen} sx={{ margin: 1 }}>
                Agregar Metadata
            </Button>
            <Dialog open={open} onClose={handleClose} style={{ minWidth: '80vw' }}>
                <DialogTitle>Agregar Nueva Metadata</DialogTitle>
                <DialogContent>
                    <Typography>Ingrese el nombre de la nueva metadata</Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre de la metadata"
                        type="text"
                        value={metadata}
                        error={error}
                        onChange={handleChangeMetadata}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cerrar
                    </Button>
                    <Button onClick={handleAddMetadata} color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
  );
}

export default MetadataDialog;
