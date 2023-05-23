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

import { getPlantsData } from '/src/services/PlantService'
import { loadAllPlantsData } from '/src/reducers/plant/plantSlice';
import { useSelector, useDispatch } from "react-redux";

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

    const currentPlants = [...plants]

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
    console.log(`Editar planta con id ${id}`);
    // Implementar la función para editar una planta
  };

  const handleDelete = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
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
              color="primary"
              onClick={() => handleEdit(params.row.plantId)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
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
        rowsPerPageOptions={[10,25,50]}
        pagination
        autoHeight 
        disableSelectionOnClick
      />
      <Box mt={2}>
        <Button
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
