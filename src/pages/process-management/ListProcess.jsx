import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { PlayCircleFilled, PauseCircleFilled, StopRounded } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

import { getProcessesData, startProcess, pauseProcess, stopProcess } from '/src/services/ProcessService';

const PROCESS_STATE = {
  STOPPED: 0,
  RUNNING: 1,
  PAUSED: 2,
}

export default function ListProcess() {
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const [processes, setProcesses] = useState([]);
  const [processState, setProcessState] = useState([]);

  const loadProcessData = () => {
    getProcessesData()
      .then((data) => {
        setProcesses(data);
        data.forEach((process) => {
          setProcessState((prevState) => {
            return {
              ...prevState,
              [process.id]: process.state,
            }
          })
        });
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
    startProcess(id).then(() => {
      setProcessState((prevState) => {
        return {
          ...prevState,
          [id]: PROCESS_STATE.RUNNING,
        }
      })
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    console.log(processState)
  }, [processState])

  const handlePause = (id) => {
    console.log(id)
    pauseProcess(id).then(() => {
      setProcessState((prevState) => {
        return {
          ...prevState,
          [id]: PROCESS_STATE.PAUSED,
        }
      })
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleStop = (id) => {
    console.log(id)
    stopProcess(id).then(() => {
      setProcessState((prevState) => {
        return {
          ...prevState,
          [id]: PROCESS_STATE.STOPPED,
        }
      })
    }).catch((error) => {
      console.error(error);
    });
  }

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
              onClick={() => processState[params.row.id] === PROCESS_STATE.RUNNING ? handlePause(params.row.id) : handlePlay(params.row.id)}
            >
              {processState[params.row.id] === PROCESS_STATE.STOPPED && <PlayCircleFilled sx={{ fontSize: '100%', borderRadius: '50%' }} />}
              {processState[params.row.id] === PROCESS_STATE.PAUSED && <PlayCircleFilled sx={{ fontSize: '100%', borderRadius: '50%' }} />}
              {processState[params.row.id] === PROCESS_STATE.RUNNING && <PauseCircleFilled sx={{ fontSize: '100%', borderRadius: '50%' }} />}

            </IconButton>

            {(processState[params.row.id] === PROCESS_STATE.PAUSED || processState[params.row.id] === PROCESS_STATE.RUNNING) &&
              (
                <IconButton
                  color="primary"
                  onClick={() => handleStop(params.row.id)}
                >
                  <StopRounded sx={{ fontSize: '100%', borderRadius: '50%' }} />
                </IconButton>
              )}
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
