import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { hasAnyRole } from '../../utils/Funtions';
import { getPlantsData, deletePlant } from '../../services/Api/PlantService';
import { loadAllPlantsData, deletePlant as deletePlantFromRedux } from '../../reducers/plant/plantSlice';
import { useMessage } from '../../providers/MessageContext';

export default function ListPlant () {
  const [plants, setPlants] = useState([]);

  const plantState = useSelector(state => state.plants);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const history = useHistory();
  const { showMessage } = useMessage();

  useEffect(() => {
    getPlantsData()
      .then((data) => {
        dispatch(loadAllPlantsData(data));
      })
      .catch((error) => {
        console.error(error);
        showMessage('Algo salio mal, por favor intente mas tarde', 'error');
      });
  }, [dispatch, showMessage]);

  useEffect(() => {
    const currentPlants = [];
    Object.keys(plantState).forEach((plant) => {
      currentPlants.push({
        plantId: plantState[plant].assetId,
        plantName: plantState[plant].plantName,
        plantDescription: plantState[plant].plantDescription,
        plantPhoto: plantState[plant].plantPhoto
      });
    });

    setPlants(currentPlants);
  }, [plantState]);

  const handleAdd = () => {
    history.push('/add-plant');
  };

  const handleEdit = (id) => {
    history.push(`/edit-plant/${id}`);
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
    deletePlant(deleteId).then(() => {
      dispatch(deletePlantFromRedux(deleteId));
    }).catch((error) => {
      console.error(error);
      showMessage('Algo salió mal al intentar borrar la planta, por favor intenta de nuevo más tarde', 'error');
    });
  };

  const columns = [
    {
      field: 'plantPhoto',
      headerName: 'Imagen',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      )
    },
    { field: 'plantName', headerName: 'Nombre', width: 200 },
    { field: 'plantDescription', headerName: 'Descripción', flex: 1 },
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
              disabled={!hasAnyRole(['Admin-plant', 'Edit-plant'])}
              color="primary"
              onClick={() => handleEdit(params.row.plantId)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              disabled={!hasAnyRole(['Admin-plant', 'Delete-plant'])}
              color="secondary"
              onClick={() => handleDelete(params.row.plantId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      }
    }
  ];

  const handleRowClick = (param, event) => {
    if (event.target.closest('[role="cell"]').dataset.field === 'actions') {
      return;
    }
    history.push(`/detail-plant/${param.row.plantId}`);
  };

  return (
    <Box m={4} maxWidth={1000} mx="auto">
      <Dialog
        open={openDialog}
        onClose={handleClose}
      >
        <DialogTitle>Borrar Planta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres borrar esta planta? Esta acción no se puede deshacer.
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
        rows={plants}
        getRowId={(row) => row.plantId}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        autoHeight
        disableSelectionOnClick
        localeText={{
          noRowsLabel: 'No hay elementos disponibles'
        }}
        className="clickable-row"
        onRowClick={handleRowClick}
      />
      <Box mt={2}>
        <Button
          disabled={!hasAnyRole(['Admin-plant', 'Add-plant'])}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Agregar planta
        </Button>
      </Box>
    </Box>
  );
}
