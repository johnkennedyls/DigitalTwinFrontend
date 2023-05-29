import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import PlantSVG from "/src/components/svg/SVGRender";
import { getPlantData } from "/src/services/PlantService";
import ReactMarkdown from 'react-markdown';

export default function Plant() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState({});
  const [updateInterval, setUpdateInterval] = useState(1000); // Intervalo de actualización inicial

  useEffect(() => {
    getPlantData(plantId)
      .then((data) => {
        setPlant(data);
      })
      .catch((error) => {
        console.error(error);
        window.location.href = "/dashboard/manage-plant";
      });
  }, [plantId]);

  // Genera los posibles intervalos de actualización
  const updateIntervals = [1000, 3000, 5000, 10000, 15000, 30000, 60000]

  const handleSelectChange = (event) => {
    setUpdateInterval(event.target.value);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" paddingTop={2}>
        <FormControl variant="standard" style={{ width: '15rem' }}>
          <InputLabel>Tasa de actualización</InputLabel>
          <Select value={updateInterval} onChange={handleSelectChange}>
            {updateIntervals.map((interval) => (
              <MenuItem key={interval} value={interval}>
                {interval / 1000} {interval === 1000 ? 'segundo' : 'segundos'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box >
      <Grid container>
        <Grid item xs={12} sm={plant.conventions ? 8 : 12}>
          <PlantSVG mapSvgTag={plant.mapSvgTag} updateInterval={updateInterval} />
        </Grid>
        <Grid item xs={12} sm={plant.conventions ? 4 : 0}>
          <Box overflow="auto" textAlign={'center'} >
            <h2>Convenciones</h2>
            <ReactMarkdown>{plant.conventions || ""}</ReactMarkdown>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
