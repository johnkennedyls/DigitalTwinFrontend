import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import PlantSVG from "/src/components/utils/SVGRender";
import { getPlantData } from "/src/services/PlantService";
import ReactMarkdown from 'react-markdown';

export default function Plant() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);

  const history = useHistory();
  const basePath = import.meta.env.VITE_DASHBOARD_BASE_PATH;

  useEffect(() => {
    getPlantData(plantId)
      .then((data) => {
        setPlant(data);
      })
      .catch((error) => {
        console.error(error);
        // window.location.href = "/dashboard/manage-plant";
        history.push(`/manage-plant`);
      });
  }, [plantId]);

  return (
    <>
      {plant === null ? <h1>Cargando datos de la planta. Esto puede tardar unos minutos</h1> :
        <>

          <Grid container>
            <Grid item xs={12} sm={plant.conventions != '' ? 8 : 12}>
              <PlantSVG mapSvgTag={plant.mapSvgTag} svgImage={plant.svgImage} />
            </Grid>
            <Grid item xs={12} sm={plant.conventions != '' ? 4 : 0} style={plant.conventions === '' ? { display: 'None' } : { display: 'initial' }}>
              <Box overflow="auto" textAlign={'center'} >
                <h2>Convenciones</h2>
                <ReactMarkdown>{plant.conventions || ""}</ReactMarkdown>
              </Box>
            </Grid>
          </Grid>
        </>
      }
    </>

  );
}
