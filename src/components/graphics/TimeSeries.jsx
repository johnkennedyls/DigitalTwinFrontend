import ChartCore from 'react-echarts-core';
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

import { Autocomplete } from "@mui/lab";

import { useSelector } from 'react-redux';

export default function TimeSeries() {
  // COLORS
  const colors = []
  
  // DATA FORMAT

  const yAxisFormat =  {
    type: 'value',
    name: '',
    position: 'left',
    alignTicks: true,
    offset: 0,
    axisLine: {
      show: true,
      lineStyle: {
        color: ''
      }
    },
    axisLabel: {
      formatter: '{value}'
    }
  }

  const seriesFormat =  {
    name: '',
    type: 'line',
    data: []
  }

  // REDUX DATA
  const plantState = useSelector(state => state.plants)

  // FORMS
  const [mode, setMode] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // PLANTS
  const [plant, setPlant] = useState("");
  const [plants, setPlants] = useState([])
  useEffect(() => {
    const currentPlants = Object.keys(plantState)
    setPlants(currentPlants)

    for(let i = 0; i< 100;i++){
      colors.push(generateRandomColor())
    }
    
    const currentOptionState = {...option}
    currentOptionState['color'] = colors
    setOption(currentOptionState)
  }, []);

  useEffect(() => {
    if(plant === ""){
      return
    }
    const data = plantState[plant]
    const currentTags = Object.keys(data[0])
    currentTags.splice(-1,1)
    setTags(currentTags)
  }, [plant]);

  // TAGS
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if(selectedTags.length == 0){
      return
    }
    const currentOptionState = {...option}
    currentOptionState['legend'] = { data:selectedTags}

    const fullData = plantState[plant]
    const selectedData = {}
    const dates = []

    for(let i = 0; i < fullData.length ; i++){
      for(let j = 0; j < selectedTags.length ; j++){
        if(i == 0){
          selectedData[selectedTags[j]] = []
        }
        selectedData[selectedTags[j]].push(fullData[i][selectedTags[j]])
      }
      dates.push(fullData[i]['Date'])
    }
    currentOptionState['xAxis'][0]['data'] = dates
    currentOptionState.yAxis = []
    currentOptionState.series = []
    for(let i = 0; i < selectedTags.length ; i++){
      const tag = selectedTags[i]
      
      const currentYaxis = {...yAxisFormat}
      currentYaxis.name = tag
      currentYaxis.offset = 80*i
      currentYaxis.axisLine.lineStyle.color = colors[i % colors.length]

      const currentSeries = {...seriesFormat}
      currentSeries.name = tag
      currentSeries.data = selectedData[tag]

      currentOptionState.yAxis.push(currentYaxis)
      currentOptionState.series.push(currentSeries)
    }

    console.log(currentOptionState)
    setOption(currentOptionState)
  },[selectedTags])

  // DATA

  const [option, setOption] = useState(
    {
      color: [],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '30%',
        right: '0%'
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: []
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: []
        }
      ],
      yAxis: [],
      series: []
    }
  );
  useEffect(() => {
    
  }, [plantState]);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

  return (
    <>
      <Box>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Planta</InputLabel>
          <Select value={plant} onChange={handlePlantChange} label="Planta">
            {plants.map((plant) => (
              <MenuItem key={plant} value={plant}>
                {plant}
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
          <FormControl variant="outlined" margin="normal" sx={{ flexGrow: 1, mr: 1 }}>
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
      <ChartCore option={option} style={{ height: 400 }} />
      <Autocomplete
        multiple
        options={tags}
        value={selectedTags}
        onChange={handleTagChange}
        getOptionLabel={(option) => option}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option}
              label={option}
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
    </>
  )
}
