import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlayCircleFilled, PauseCircleFilled, StopRounded } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

import { getProcessesData, deleteProcess, startProcess, pauseProcess, stopProcess } from './services/ProcessService';

const PROCESS_STATE = {
  STOPPED: 0,
  RUNNING: 1,
  PAUSED: 2,
}

export default function ListProcess() {
  const [processes, setProcesses] = useState([]);
  const [processState, setProcessState] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const history = useHistory();

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
    history.push("add-process");
  };

  const handlePlay = (id) => {
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

  const handlePause = (id) => {
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

  const handleSeeExecutions = (param, event) => {
    if (event.target.closest('[role="cell"]').dataset.field === "actions") {
      return;
    }
    history.push(`process-executions/${param.row.id}`);
  }

  const handleEdit = (id) => {
    history.push(`/edit-process/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    setOpenDialog(false);
    deleteProcess(deleteId).then(() => {
      loadProcessData();
    }).catch((error) => {
      console.error(error);
    });
  };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', flex: 1 },
    {
      field: 'assets',
      headerName: 'Equipos',
      flex: 1,
      sortable: false,
      valueGetter: (params) => params.row.assets.map(asset => asset.name).join(", "),
      renderCell: (params) => {
        const assetNames = params.value.split(", ");
        const displayAssets = assetNames.slice(0, 3).join(", ");
        return (
          <span>
            {assetNames.length > 3 ? 
              `${displayAssets}, ...` : 
              displayAssets
            }
          </span>
        );
      },
    },
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

            <IconButton
              color="primary"
              disabled
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Box m={3} maxWidth={1000} mx="auto">
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Borrar Proceso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres borrar este proceso? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
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
        className="clickable-row"
        onRowClick={handleSeeExecutions}
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
