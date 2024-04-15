import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { getExutionsByProcess } from '../../services/Api/ProcessService';
import { setCreatingCanvas } from '../../reducers/graphic/canvaSlice';

export default function ListExecutionsProcess () {
  const [executions, setExecutions] = useState([]);
  const { processId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    loadExecutionsData();
  }, []);

  const loadExecutionsData = () => {
    getExutionsByProcess(processId)
      .then((data) => {
        setExecutions(data);
      })
      .catch((error) => {
        console.error(error);
        // Manejar el error adecuadamente
      });
  };

  const formatDate = (date) => {
    if (date === -1) {
      return '';
    }
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss'); // Formato de fecha deseado
  };

  const columns = [
    { field: 'processName', headerName: 'Proceso', width: 200 },
    {
      field: 'startDate',
      headerName: 'Fecha de inicio',
      width: 200,
      valueFormatter: (params) => formatDate(params.value) // Formatear la fecha de inicio
    },
    {
      field: 'endDate',
      headerName: 'Fecha de fin',
      width: 200,
      valueFormatter: (params) => formatDate(params.value) // Formatear la fecha de fin
    },
    { field: 'state', headerName: 'Estado', width: 150 },
    { field: 'operName', headerName: 'Operador', width: 200 }
  ];

  const handleRowClick = (param) => {
    const info = {
      executionId: param.row.id,
      processId: param.row.processId
    }
    dispatch(setCreatingCanvas(info));
    window.open('/dashboard/create-charts', '_blank');
  }

  return (
    <Box m={4} maxWidth={1000} mx="auto">
      <DataGrid
        rows={executions}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        autoHeight
        disableSelectionOnClick
        onRowClick={handleRowClick}
        localeText={{
          noRowsLabel: 'No hay elementos disponibles'
        }}
      />
    </Box>
  );
}
