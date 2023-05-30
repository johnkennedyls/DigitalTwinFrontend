import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

import { getPlantsData, deletePlant } from '/src/services/PlantService'
import { loadAllPlantsData, deletePlant as deletePlantFromRedux } from '/src/reducers/plant/plantSlice';
import { useSelector, useDispatch } from "react-redux";
import { hasAnyRole } from "/src/services/utils/funtions";

export default function ListPlant() {
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const [plants, setPlants] = useState([]);

  const plantState = useSelector(state => state.plants)
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

  useEffect(() => {
    loadPLantData();
  }, []);

  useEffect(() => {

    const currentPlants = []
    console.log(plantState)
    Object.keys(plantState).forEach((plant) => {
      currentPlants.push({
        plantId: plantState[plant].plantId,
        plantName: plantState[plant].plantName,
        plantDescription: plantState[plant].plantDescription,
        plantPhoto: plantState[plant].plantPhoto,
      })
    });

    setPlants(currentPlants);
  }, [plantState]);

  const handleAdd = () => {
    window.location.href = `${publicUrl}/add-plant`;
  };

  const handleEdit = (id) => {
    window.location.href = `${publicUrl}/edit-plant/${id}`;
  };

  const handleDelete = (id) => {

    deletePlant(id).then(() => {
      // setPlants(plants.filter((plant) => plant.plantId !== id));
      dispatch(deletePlantFromRedux(id));
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
      ),
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
      },
    },
  ];

  return (
    <Box m={4} maxWidth={1000} mx="auto">
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
          noRowsLabel: 'No hay elementos disponibles',
        }}
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
