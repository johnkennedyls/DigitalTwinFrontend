import { useState } from "react";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import styled from "styled-components";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
  ButtonBase,
} from "@mui/material";

const initialPlants = [
  {
    id: 1,
    name: "Planta Bioreactor 40L",
    image:
      "https://www.icesi.edu.co/images/instalaciones/lab-planta-piloto-17.jpg",
  },
  {
    id: 2,
    name: "Planta de ejemplo 2",
    image:
      "https://www.icesi.edu.co/images/instalaciones/lab-planta-piloto-18.jpg",
  },
  {
    id: 3,
    name: "Planta de ejemplo 3",
    image:
      "https://www.icesi.edu.co/images/instalaciones/lab-planta-piloto-11.jpg",
  },
  {
    id: 4,
    name: "Planta de ejemplo 4",
    image: "https://via.placeholder.com/150",
  },
];

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const ListPlant = () => {
  const [page, setPage] = useState(1);
  const [plants, setPlants] = useState(initialPlants);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const history = useHistory();
  const handleClick = (plantId) => {
    history.push(`/plants/${plantId}`);
  };

  const handleDelete = (plantId) => {
    setPlants(plants.filter((plant) => plant.id !== plantId));
  };

  return (
    <Container>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              Nuevo
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="secondary">
              Ordenar
            </Button>
          </Box>
        </Box>
      
        {plants.slice((page - 1) * 3, page * 3).map((plant) => (
          <Card key={plant.id} sx={{ display: "flex", mb: 2 }} >
         
              <CardMedia onClick={()=> handleClick(plant.id)}
                component="img"
                sx={{ width: 150 }}
                image={plant.image}
                alt={plant.name}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    {plant.name}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(plant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Box>
        
          </Card>
        ))}

        <Pagination
          count={Math.ceil(plants.length / 2)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default ListPlant;
