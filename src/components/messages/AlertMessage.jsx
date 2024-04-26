import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AlertMessage = ({ message, severity, open, handleClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  if (!open) {
    return null;
  }

  return (
    <Alert severity={severity} style={{ width: '20%', margin: '0 auto' }}>
      <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
      {message}
    </Alert>
  );
};

export default AlertMessage;
