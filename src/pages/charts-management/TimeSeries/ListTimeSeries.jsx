import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import TimeSeries from './components/TimeSeries';
import { getCanvas } from '../../../services/Api/CanvasService';
import SaveButton from '../../../components/buttons/SaveButton';
import { InfoAlert } from '../../../components/utils/Alert';

export default function ListTimeSeries () {
  const [canvas, setCanvas] = useState();
  const [charts, setCharts] = useState([]);
  const { canvasId } = useParams();
  const [create, setCreate] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const edit = queryParams.get('edit');

  useEffect(() => {
    if (canvasId) {
      getCanvas(canvasId).then((canvas) => {
        if (canvas.charts.length > 0) {
          setCanvas(canvas);
          setCharts(canvas.charts.map((chart) => <TimeSeries key={chart.id} edit={edit} {...chart} />));
        } else InfoAlert('No charts found in this canva.');
      });
    }else setCreate(true);
  }, [canvasId]);

  const handleAddChart = () => {
    setCharts([...charts, <TimeSeries key={charts.length} edit={true} />]);
  };

  const handleDeleteChart = (index) => {
    setCharts(charts.filter((_, i) => i !== index));
  };

  const handleSaveCharts = () => {
    console.log('Save charts');
    console.log(canvas);
  };

  return (
    <Box>
      {(edit || create) && <Box
        sx={{
          position: 'fixed',
          bottom: 10,
          left: 10,
          zIndex: 1000
        }}
      >
        <SaveButton onClick={handleSaveCharts}/>
      </Box>}
      {charts.map((chart, index) => (
        <Box
          key={chart.key}
          sx={{
            position: 'relative',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            padding: 2,
            marginTop: 2
          }}
        >
          {(edit || create) && <Box
            sx={{
              position: 'absolute',
              top: 5,
              right: 10
            }}
          >
            <IconButton
              edge="end"
              color="gray"
              onClick={() => handleDeleteChart(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>}
          {chart}
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          minWidth: '100%',
          marginTop: 2,
          maginBottom: 5
        }}
      >
        {(edit || create) && <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddChart}
        >
          Add new canvas
        </Button>}
      </Box>
    </Box>
  );
}
