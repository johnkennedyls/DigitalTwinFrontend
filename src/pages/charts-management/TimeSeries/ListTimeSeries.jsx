import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import TimeSeries from './components/TimeSeries';
import { editCanvas, getCanvas, saveCanvas } from '../../../services/Api/CanvasService';
import SaveButton from '../../../components/buttons/SaveButton';
import { InfoAlert } from '../../../components/utils/Alert';

export default function ListTimeSeries () {
  const [canvas, setCanvas] = useState({ deletedCharts: []});
  const [charts, setCharts] = useState([]);

  const [editingName, setEditingName] = useState(false);
  const { canvasId } = useParams();

  let edit = new URLSearchParams(useLocation().search).get('edit');

  useEffect(() => {
    if (canvasId) {
      getCanvas(canvasId).then((canvas) => {
        if (canvas.charts.length > 0) {
          setCanvas({ ...canvas, deletedCharts: []});
          setCharts(canvas.charts.map((chart) => <TimeSeries key={chart.id} edit={edit} {...chart} />));
        } else InfoAlert('No charts found in this canva.');
      });
    }else edit = true;
  }, [canvasId]);

  const handleNameChange = (event) => {
    setCanvas((prevCanvas) => ({ ...prevCanvas, name: event.target.value }));
  };

  const handleSharedChange = (event) => {
    setCanvas((prevCanvas) => ({ ...prevCanvas, isShared: event.target.checked }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setEditingName(false);
    }
  }

  const handleAddChart = () => {
    setCharts([...charts, <TimeSeries key={charts.length} edit={true} />]);
  };

  const handleDeleteChart = (index) => {
    setCharts((prevCharts) => {
      return prevCharts.map((chart, i) => {
        if (i === index) {
          const { chartId } = chart.props;
          if (chartId) {
            setCanvas((prevCanvas) => ({
              ...prevCanvas,
              deletedCharts: [...prevCanvas.deletedCharts, chartId]
            }));
          }
          return null;
        }
        return chart;
      }).filter(Boolean);
    });
  };

  const handleSaveCharts = () => {
    const newCanvas = { ...canvas, charts: charts.map((chart) => chart.props) };
    if (canvasId) {
      console.log(newCanvas);
      editCanvas(newCanvas, canvasId);
    } else {
      saveCanvas(newCanvas);
    }
  };

  return (
    <Box alignContent={'center'}>
      {edit && editingName ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={'60%'}
          mx={'auto'}
        >
          <TextField
            autoFocus
            variant="outlined"
            label="Canvas Name"
            margin="normal"
            fullWidth
            value={canvas?.name}
            onChange={handleNameChange}
            onKeyDown={handleKeyPress}
            onBlur={() => setEditingName(false)}
          />
        </Box>
      ) : (
        <Typography
          variant="h3"
          align='center'
          m={2}
          onClick={() => setEditingName(true)}
          style={{ cursor: 'pointer' }}
        >
          {canvas?.name || 'Press to Change Canvas Name'}
        </Typography>
      )}
      {(edit) && <Box
        sx={{
          position: 'fixed',
          bottom: 10,
          left: 10,
          zIndex: 1000
        }}
      >
        <SaveButton onClick={handleSaveCharts}/>
      </Box>}
      {(edit) && <Box
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          zIndex: 1000
        }}
      >
        <FormControlLabel 
          control={<Switch
                    checked={canvas?.isShared || false}
                    onChange={handleSharedChange}
                  />}
          label={canvas?.isShared ? "Shared" : "Not Shared"}
        />  
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
          {(edit) && <Box
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
        {(edit) && <Button
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
