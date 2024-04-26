import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { getExutionsByProcess } from '../../services/Api/ProcessService';
import RegisterManualMeasurementForm from './components/forms/RegisterManualMeasurementForm';
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
    })
    .catch((error) => {
      console.error(error);
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
    { field: 'state', headerName: 'Estado', width: 80 },
    { field: 'operName', headerName: 'Operador', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <RegisterManualMeasurementForm executionId={params.row.id}/>
            <OperationDialog execution={params.row} reload={reload} setReload={setReload} />
            <ListOperationDialog logs={params.row.logs} />
            <ViewGraph param={params.row} />
          </>
        )
      }
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
