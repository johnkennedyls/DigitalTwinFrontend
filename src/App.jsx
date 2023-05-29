import PropTypes from 'prop-types'
import MainLayout from './layouts/main/MainLayout'

import { useEffect } from 'react';
import { StompClient } from './services/utils/stompClient';
// import * as Stomp from "stompjs";
// import * as SockJS from "sockjs-client";

import { updateTagData } from './reducers/plant/tagSlice'
import { useDispatch } from 'react-redux';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { esES } from '@mui/x-date-pickers/locales';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';

const theme = createTheme({}, esES);



const App = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const token = localStorage.getItem('access_token');
  // var header = { 'Authorization': 'Bearer ' + token };

  // let ws = new SockJS(`${apiUrl}/public/websocket`, {
  //   headers: header
  // });
  // let stompClient = Stomp.over(ws);


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

  // const openGlobalSocket = () => {
  //   const token = localStorage.getItem('access_token');
  //   var header = { 'Authorization': 'Bearer ' + token };
  //   stompClient.subscribe(
  //     '/app/realtime',
  //     (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       dispatch(updateTagData(parsedMessage));
  //     },
  //     {
  //       headers: header
  //     }
  //   )
  // }



  useEffect(() => {
    // console.log('Connecting to WebSocket server')
    // console.log('Header: ', header)
    // stompClient.connect({ headers: header }, () => {
    //   openGlobalSocket();
    // });
    stompClient.connect({
      'Authorization': 'Bearer ' + token
    });
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <MainLayout>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </LocalizationProvider>
    </MainLayout>
  )
}

App.propTypes = {
  children: PropTypes.element,
}


export default App;
