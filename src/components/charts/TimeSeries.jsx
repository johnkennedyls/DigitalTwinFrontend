import * as ECharts from "echarts/core";
import ReactECharts from 'echarts-for-react';
import { ToolboxComponent, DataZoomComponent, AxisPointerComponent, SingleAxisComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  TextField,
  Chip
} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Autocomplete } from '@mui/material'
import { useSelector } from 'react-redux';
import { deepCopy } from '../../services/utils/funtions';

import { DEFAULT_TIME_SERIES_OPTION, DEFAULT_Y_AXIS_FORMAT, DEFAULT_SERIES_FORMAT, SYMBOLS } from '../../services/utils/constants';

ECharts.use([
  ToolboxComponent,
  DataZoomComponent,
  AxisPointerComponent,
  LineChart,
  SingleAxisComponent
]);

export default function TimeSeries() {

  // REDUX DATA
  const plantState = useSelector(state => state.plants)
  const tagsState = useSelector(state => state.tags)

  // FORMS
  const [mode, setMode] = useState('');
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // PLANTS
  const [plant, setPlant] = useState("");
  const [plants, setPlants] = useState([])

  useEffect(() => {
    const currentPlants = Object.keys(plantState)
    setPlants(currentPlants)
  }, []);

  useEffect(() => {
    if (plant === "") {
      return
    }
    const data = plantState[plant].tags
    const currentTags = Object.keys(data)
    setSelectedTags([])
    setTags(currentTags)
  }, [plant]);

  // TAGS
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  let currentOption = {}

  const getOption = () => {
    const OFFSET = 60
    if(!isPlaying){
      return currentOption
    }
    const option = deepCopy(DEFAULT_TIME_SERIES_OPTION)
    option.legend.data = []
    selectedTags.forEach((tag) => {
      option.legend.data.push(plantState[plant]['tags'][tag])
    })

    option.grid['left'] = `${OFFSET * selectedTags.length}px`

    option.xAxis[0].data = tagsState.date

    for (let i = 0; i < selectedTags.length; i++) {
      const tag = selectedTags[i]
      const tagName = plantState[plant]['tags'][tag]
      const currentYaxis = deepCopy(DEFAULT_Y_AXIS_FORMAT)
      currentYaxis.offset = OFFSET * i
      currentYaxis.axisLine.lineStyle.color = option.color[i]
      option.yAxis.push(currentYaxis)

      const currentSeries = deepCopy(DEFAULT_SERIES_FORMAT)
      currentSeries.name = tagName
      currentSeries.data = tagsState[tag]
      currentSeries.symbol = SYMBOLS[i%SYMBOLS.length]
      if (i != 0) {
        currentSeries['yAxisIndex'] = i
      }
      option.series.push(currentSeries)
    }

    currentOption = option
    return option;
  }
  
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTagChange = (event, value) => {
    setSelectedTags(value);
  };

  const handlePlantChange = (event) => {
    setPlant(event.target.value);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const showTags = () => {
    return plant != '' && (mode == 'realtime' || (mode == 'range' && dateRange.start != '' && dateRange.end != ''));
  };

  const showGraphic = () => {
    return selectedTags.length > 0
  }

  return (
    <Box style={{ maxWidth: '80%', margin: 'auto' }}>
      <Box>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Planta</InputLabel>
          <Select value={plant} onChange={handlePlantChange} label="Planta">
            {plants.map((currentPlant) => (
              <MenuItem key={currentPlant} value={currentPlant}>
                { plantState[currentPlant]['name']}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControl variant="outlined" margin="normal" sx={mode=='range'?{flexGrow: 1, mr:1}:{flexGrow: 1, mr:0}}>
            <InputLabel>Modo</InputLabel>
            <Select value={mode} onChange={handleModeChange} label="Modo">
              <MenuItem value="realtime">Tiempo real</MenuItem>
              <MenuItem value="range">Delimitado</MenuItem>
            </Select>
          </FormControl>

          {mode === "range" && (
            <Box display="flex" justifyContent="space-between" sx={{ flexGrow: 2 }}>
              <TextField
                label="Fecha inicio"
                type="datetime-local"
                value={dateRange.start}
                onChange={(e) => handleDateChange("start", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <TextField
                label="Fecha fin"
                type="datetime-local"
                value={dateRange.end}
                onChange={(e) => handleDateChange("end", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                sx={{ flexGrow: 1 }}
              />
            </Box>
          )}
        </Box>
      </Box>
      {(showGraphic() && showTags()) && (
        <Box>
          <ReactECharts key={selectedTags.length} option={getOption()} style={{ height: 400 }} />
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Box>
        </Box>
      )}
      {showTags() && isPlaying && (
        <Box>
          <Autocomplete
            clearIcon={false}
            multiple
            options={tags}
            value={selectedTags}
            onChange={handleTagChange}
            getOptionLabel={(option) => plantState[plant]['tags'][option]}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option}
                  label={plantState[plant]['tags'][option]}
                  color="primary"
                  onDelete={(_, clicked) => {
                    if (clicked) {
                      handleTagChange(null, value.filter((v) => v !== option));
                    }
                  }}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Selecciona los tags"
                placeholder="Tags"
              />
            )}
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}