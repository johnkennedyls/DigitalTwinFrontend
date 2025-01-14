import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, Button, Avatar,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';

import { hasAnyRole } from '../../utils/Funtions';
import { getPlantsData, deletePlant } from '../../services/Api/PlantService';
import { loadAllPlantsData, deletePlant as deletePlantFromRedux } from '../../reducers/plant/plantSlice';
import { useMessage } from '../../providers/MessageContext';
import RemoveButton from '../../components/buttons/RemoveBotton';
import EditButton from '../../components/buttons/EditButton';

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
        showMessage('Something went wrong, please try again later.', 'error');
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
      showMessage('Something went wrong when trying to delete the plant, please try again later.', 'error');
    });
  };

  const columns = [
    {
      field: 'plantPhoto',
      headerName: 'Image',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      )
    },
    { field: 'plantName', headerName: 'Name', width: 200 },
    { field: 'plantDescription', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <EditButton
              disable={!hasAnyRole(['Admin-plant', 'Edit-plant'])}
              onClick={() => handleEdit(params.row.plantId)}
            />
            <RemoveButton
              disable={!hasAnyRole(['Admin-plant', 'Delete-plant'])}
              onClick={() => handleDelete(params.row.plantId)}
            />
          </>
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
          noRowsLabel: 'No items available'
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
          Add plant
        </Button>
      </Box>
    </Box>
  );
}
