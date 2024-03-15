import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { esES } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { updateTagData } from './reducers/plant/tag/tagSlice';
import { StompClient } from './utils/stompClient';
import MainLayout from './layouts/main/MainLayout';
import { MessageProvider } from './providers/MessageContext';
import Loading from './components/utils/Loading';
import './app.css';

const theme = createTheme({}, esES);

const App = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const token = localStorage.getItem('access_token');

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('');
    }
  }, []);

  const onDisconnect = () => {
    console.info('Disconnected from WebSocket server');
  };

  const onMessageReceived = (message) => {
    const parsedMessage = JSON.parse(message.body);
    console.log('Received message:', parsedMessage);
    dispatch(updateTagData(parsedMessage));
  };

  const onConnect = () => {
    console.info('Connected to WebSocket server');
    stompClient.subscribe('/topic/realtime', onMessageReceived);
  };

  const stompClient = new StompClient(
    `${apiUrl}/public/websocket`,
    onConnect,
    onDisconnect
  );

  useEffect(() => {
    stompClient.connect({
      Authorization: 'Bearer ' + token
    });
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <MainLayout>
      <React.Fragment>
        <Loading />
        <MessageProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </LocalizationProvider>
        </MessageProvider>
      </React.Fragment>
    </MainLayout>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
