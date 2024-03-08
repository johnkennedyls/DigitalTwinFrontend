import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import PlantSVG from "./components/utils/SVGRender";
import { getPlantData } from "./services/PlantService";
import ReactMarkdown from 'react-markdown';

import CircularProgress from '@mui/material/CircularProgress';

export default function Plant() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getPlantData(plantId)
      .then((data) => {
        setPlant(data);
      })
      .catch((error) => {
        console.error(error);
        history.push(`/manage-plant`);
      });
  }, [plantId, history]);

  useEffect(() => {
    console.log(plant);
  }, [plant]);

  return (
    <>
      {plant === null ?
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: "5rem" }}>
          <CircularProgress />
          <h2>Cargando datos de la planta. Esto puede tardar unos minutos.</h2>
        </Box>
        :
        <Grid container>
          <Grid item xs={12} sm={plant.conventions != '' ? 9 : 12}>
            <PlantSVG mapSvgTag={plant.mapSvgTag} svgImage={plant.svgImage} />
          </Grid>
          <Grid item xs={12} sm={plant.conventions != '' ? 3 : 0} style={plant.conventions === '' ? { display: 'None' } : { display: 'initial' }}>
            <Box overflow="auto" textAlign={'center'} >
              <h2>Convenciones</h2>
              <ReactMarkdown>{plant.conventions || ""}</ReactMarkdown>
            </Box>
          </Grid>
        </Grid>
      }
    </>

  );
}
