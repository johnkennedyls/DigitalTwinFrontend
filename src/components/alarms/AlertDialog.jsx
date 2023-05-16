import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

function AlertDialog(props) {
  const { open, onClose, onDelete, onConfirm, title, message, confirm } = props;

  const handleAction = () => {
    if (confirm) {
      onConfirm();
    } else {
      onDelete();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAction} color="secondary" autoFocus>
          {confirm ? "Confirmar" : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;