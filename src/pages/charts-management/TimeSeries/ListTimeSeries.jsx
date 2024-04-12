import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { editCanvas, getCanvas, saveCanvas } from '../../../services/Api/CanvasService';
import SaveButton from '../../../components/buttons/SaveButton';
import { InfoAlert } from '../../../components/utils/Alert';

import TimeSeries from './components/TimeSeries';

export default function ListTimeSeries () {
  const [canvas, setCanvas] = useState({ name: '', isShared: true, charts: [], deletedCharts: [] });
  const [charts, setCharts] = useState([]);

  const [edit, setEdit] = useState(new URLSearchParams(useLocation().search).get('edit') || false);
  const { canvasId } = useParams();

  function updateChart (index, chart) {
    setCanvas((prevCanvas) => {
      if (prevCanvas.charts[index]) {
        const updatedChart = [...prevCanvas.charts];
        updatedChart[index] = chart;
        return { ...prevCanvas, charts: updatedChart };
      } else return { ...prevCanvas, charts: [...prevCanvas.charts, chart] };
    });
  }

  useEffect(() => {
    if (canvasId && Object.keys(canvas).length === 4) {
      getCanvas(canvasId).then((canvas) => {
        setCanvas({ ...canvas, deletedCharts: [] });
        if (canvas.charts.length > 0) {
          setCharts(
            canvas.charts.map((chart, index) => (
              <TimeSeries
                key={index}
                index={index}
                edit={edit}
                updateChart={updateChart}
                chart={chart}
                canvasId={canvas.canvasId}
              />
            ))
          );
        } else InfoAlert('No charts found in this canva.');
      });
    } else setEdit(true);
  }, [canvasId]);

  const handleNameChange = (event) => {
    setCanvas((prevCanvas) => ({ ...prevCanvas, name: event.target.value }));
  };

  const handleSharedChange = (event) => {
    setCanvas((prevCanvas) => ({ ...prevCanvas, isShared: event.target.checked }));
  };

  const handleAddChart = () => {
    const newChartKey = `chart-${Date.now()}-${charts.length}`;
    setCharts([
      ...charts,
      <TimeSeries
        key={newChartKey}
        index={charts.length}
        edit={true}
        updateChart={updateChart}
        chart={{}}
        canvasId={canvas?.canvasId || ''}
      />
    ]);
  };

  const handleDeleteChart = (index) => {
    setCharts((prevCharts) => {
      return prevCharts.map((chart, i) => {
        if (i === index) {
          const { chartId } = chart.props.chart;
          if (chartId) {
            setCanvas((prevCanvas) => ({
              ...prevCanvas,
              deletedCharts: [...prevCanvas.deletedCharts, chartId]
            }));
          }
          setCanvas((prevCanvas) => ({
            ...prevCanvas,
            charts: prevCanvas.charts.filter((_, i) => i !== index)
          }));
          return null;
        }
        return chart;
      }).filter(Boolean);
    });
  };

  const handleSaveCharts = () => {
    console.log(canvas);
    if (canvasId) {
      editCanvas(canvas, canvasId).then((response) => {
        response.charts.map(chart => {
          chart.typeId = chart.type.typeId;
          return chart;
        });
        setCharts(
          response.charts.map((chart, index) => (
            <TimeSeries key={index} index={index} edit={edit} updateChart={updateChart} chart={chart} canvasId={response.canvasId} />
          ))
        );
        const updatedCanvas = { ...response, charts: response.charts };
        setCanvas({ ...updatedCanvas, deletedCharts: [] });
      });
    } else {
      saveCanvas(canvas).then((response) => {
        if (response) {
          window.location.href = `/dashboard/manage-charts/${response.canvasId}?edit=true`;
        }
      });
    }
  };

  return (
    <Box alignContent={'center'}>
      {edit &&
        (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={'60%'}
            mx={'auto'}
          >
            <TextField
              autoFocus
              variant="standard"
              placeholder="Type the canvas name"
              margin="normal"
              fullWidth
              value={canvas?.name}
              onChange={handleNameChange}
              inputProps={{
                style: { fontSize: '30px', textAlign: 'center' },
                maxLength: 50
              }}
            />
          </Box>
        )
      }
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
            checked={canvas?.isShared}
            onChange={handleSharedChange}
          />}
          label={canvas?.isShared ? 'Shared' : 'Not Shared'}
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
