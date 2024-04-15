import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Grid, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import PlantSVG from '../../components/utils/SVGRender';
import { getPlantData } from '../../services/Api/PlantService';

export default function Plant () {
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
        history.push('/manage-plant');
      });
  }, [plantId, history]);

  return (
    <>
      {plant === null
        ? <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5rem' }}>
          <CircularProgress />
          <h2>Loading plant data. This may take a few minutes.</h2>
        </Box>
        : <Grid container>
          <Grid item xs={12} sm={plant.conventions !== '' ? 9 : 12}>
            <PlantSVG mapSvgTag={plant.mapSvgTag} svgImage={plant.svgImage} />
          </Grid>
          <Grid item xs={12} sm={plant.conventions !== '' ? 3 : 0} style={plant.conventions === '' ? { display: 'None' } : { display: 'initial' }}>
            <Box overflow="auto" textAlign={'center'} >
              <h2>Conventions</h2>
              <ReactMarkdown>{plant.conventions || ''}</ReactMarkdown>
            </Box>
          </Grid>
        </Grid>
      }
    </>

  );
}
