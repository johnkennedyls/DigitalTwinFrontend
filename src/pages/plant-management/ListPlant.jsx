import { useState } from "react";
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

const initialPlants = [
  {
    id: 1,
    name: "Planta 1",
    description: "Descripción de la planta 1",
    imageUrl: "https://www.icesi.edu.co/images/instalaciones/lab-planta-piloto-17.jpg",
  },
  {
    id: 2,
    name: "Planta 2",
    description: "Descripción de la planta 2",
    imageUrl: "https://www.icesi.edu.co/images/instalaciones/lab-planta-piloto-17.jpg",
  }
];

function ListPlant() {
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const [plants, setPlants] = useState(initialPlants);

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
      field: 'imageUrl',
      headerName: 'Imagen',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
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
    <Box m={4} maxWidth={1000} mx="auto">
      <DataGrid
        rows={plants}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10,25,50]}
        pagination
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

export default ListPlant;
