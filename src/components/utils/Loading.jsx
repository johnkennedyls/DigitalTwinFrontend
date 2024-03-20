import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/Loading.css';

const Loading = () => {
  const { status } = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === false) {
      setTimeout(() => setOpen(status), 100);
    } else setOpen(status);
  }, [status]);

  return (
    <Backdrop
      open={open}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
