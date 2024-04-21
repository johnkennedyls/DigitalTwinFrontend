import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { getExutionsByProcess } from '../../services/Api/ProcessService';
import OperationDialog from './components/actions/OperationDialog';
import ListOperationDialog from './components/actions/ListOperationDialog';
import ViewGraph from './components/actions/ViewGraph';

export default function ListExecutionsProcess () {
  const [executions, setExecutions] = useState([]);
  const [reload, setReload] = useState(false);
  const { processId } = useParams();

  useEffect(() => {
    loadExecutionsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const loadExecutionsData = () => {
    getExutionsByProcess(processId)
      .then((data) => {
        setExecutions(data);
        console.log(data);
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
    { field: 'processName', headerName: 'Process', width: 200 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 175,
      valueFormatter: (params) => formatDate(params.value) // Formatear la fecha de inicio
    },
    {
      field: 'endDate',
      headerName: 'Ending Date',
      width: 175,
      valueFormatter: (params) => formatDate(params.value) // Formatear la fecha de fin
    },
    { field: 'state', headerName: 'State', width: 100 },
    { field: 'operName', headerName: 'Operator', width: 200 },
    { field: 'actions', headerName: 'Actions', type: 'actions', width: 150,
      renderCell: (params) => (
        <>
          <OperationDialog execution={params.row} reload={reload} setReload={setReload} />
          <ListOperationDialog logs={params.row.logs} />
          <ViewGraph param={params.row} />
        </>
      )
    }
  ];

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
        disableRowSelectionOnClick
        localeText={{
          noRowsLabel: 'No items available'
        }}
      />
    </Box>
  );
}
