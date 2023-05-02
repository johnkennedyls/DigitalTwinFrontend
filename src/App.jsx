/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AlarmService from './services/AlarmService';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ListAlarm from  './pages/alarm-management/ListAlarm.jsx';


const App = () => {

  const addAlarmPath = "/add-alarm"
  const editAlarmPath = "/edit-alarm"
  const [alarms, setAlarms] = useState([]);

  const columns = [
    {
      title: "Nombre",
      field: "sysName"
    },
    {
        title: "Descripción",
        field: "sysName"
    },
    {
        title: "Tag",
        field: "sysName"
    },
    {
        title: "Condición",
        field: "sysName"
    }
  ];

  useEffect(() => {
    getAlarms()
  }, []);

  const getAlarms = async () => {
    try {
      const data = await AlarmService.getAlarms();
      setAlarms(data);
    } catch (error) {
      console.error(error);
    }
  };

  
// Definir las columnas del DataGrid
const systemColumns = [
  { field: 'sysId', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'description', headerName: 'Descripción', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
];

  const systemData = [
    { sysId: 1, name: 'Sistema 1', description: 'Descripción del sistema 1' },
    { sysId: 2, name: 'Sistema 2', description: 'Descripción del sistema 2' },
    { sysId: 3, name: 'Sistema 3', description: 'Descripción del sistema 3' },
  ];
  return (
    <div >
      <ListAlarm>
        
      </ListAlarm>
    </div>
  )
}

export default App;