import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import * as Stomp from "stompjs"
// import * as SockJS from "sockjs-client"
import { useDispatch } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { esES } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { updateTagData } from './reducers/plant/tagSlice';
import { StompClient } from './services/utils/stompClient';
import MainLayout from './layouts/main/MainLayout';
import { MessageProvider } from './providers/MessageContext';

import './assets/styles/global.css';
import Loading from './components/utils/Loading';

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
    console.log('Disconnected from WebSocket server');
  };

  const onMessageReceived = (message) => {
    const parsedMessage = JSON.parse(message.body);
    dispatch(updateTagData(parsedMessage));
  };

  const onConnect = () => {
    console.log('Connected to WebSocket server');
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
    <Loading />
      <MessageProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </LocalizationProvider>
      </MessageProvider>
    </MainLayout>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
