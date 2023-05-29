import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { PlayCircleFilled /*PauseCircleFilled*/ } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

import { getProcessesData } from '/src/services/ProcessService';

export default function ListProcess() {
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const [processes, setProcesses] = useState([]);

  const loadProcessData = () => {
    getProcessesData()
      .then((data) => {
        setProcesses(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    loadProcessData();
  }, []);

  const handleAdd = () => {
    window.location.href = `${publicUrl}/add-process`;
  };

  const handlePlay = (id) => {
    console.log(id)
  }

  // const handleEdit = (id) => {
  //   window.location.href = `${publicUrl}/edit-process/${id}`;
  // };

  // const handleDelete = (id) => {
  //   deleteProcess(id)
  //     .then(() => {
  //       setProcesses(processes.filter((process) => process.id !== id));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', flex: 1 },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              color="primary"
              onClick={() => handlePlay(params.row.id)}
            >
              <PlayCircleFilled sx={{ fontSize: '100%', borderRadius: '50%' }}/>
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Box m={3} maxWidth={1000} mx="auto">
      <DataGrid
        rows={processes}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        autoHeight
        disableSelectionOnClick
        localeText={{
          noRowsLabel: 'No hay elementos disponibles',
        }}
      />
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Agregar proceso
        </Button>
      </Box>
    </Box>
  );
}
