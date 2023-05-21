import PropTypes from 'prop-types'
import MainLayout from './layouts/main/MainLayout'

import { useEffect } from 'react';
import { StompClient } from './services/utils/stompClient';

import { updateTagData } from './reducers/plant/tagSlice'
import { loadAllPlantsData } from './reducers/plant/plantSlice';
import { useDispatch } from 'react-redux';

import {getPlantsData} from './services/PlantService'

const App = ({ children }) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const loadPLantData = () => {
    getPlantsData()
    .then((data) => {
      dispatch(loadAllPlantsData(data));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const onDisconnect = () => {
    console.log('Disconnected from WebSocket server');
  };

  const onMessageReceived = (message) => {
    
    const parsedMessage = JSON.parse(message.body);
    dispatch(updateTagData(parsedMessage));
  };

  const onConnect = () => {
    console.log('Connected to WebSocket server');
    stompClient.subscribe('/topic/random', onMessageReceived);
  };

  const stompClient = new StompClient(
    `${apiUrl}/websocket`,
    onConnect,
    onDisconnect
  );

  useEffect(() => {
    loadPLantData();
    stompClient.connect();
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

App.propTypes = {
  children: PropTypes.element,
}


export default App;
