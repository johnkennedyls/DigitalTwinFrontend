import * as ECharts from "echarts/core";
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
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

import { getDelimitedData } from '../../services/PlantService';
import {getProcessesData} from '../../services/ProcessService';
import ProcessSelectionForm from '../filters/ProcessSelectionForm';
import ExecutionSelectionForm from '../filters/ExecutionSelectionForm';
import { getExutionsByProcess } from "../../services/ProcessService";
import { getProcessByPlant } from "../../services/ProcessService";

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
  const processState = useSelector(state => state.processes)
  const executionState = useSelector(state => state.executions)

  // AXIOS DATA
  const [delimitedData, setDelimitedData] = useState({ date: [] })

  // FORMS
  const [mode, setMode] = useState('');
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // PLANTS
  const [plant, setPlant] = useState("");
  const [plants, setPlants] = useState([])

  useEffect(() => {
    const currentPlants = Object.keys(plantState)
    setPlants(currentPlants)
  }, [plantState]);

  useEffect(() => {
    if (plant === "") {
      return
    }
    const data = plantState[plant].tags
    const currentTags = Object.keys(data)
    setSelectedTags([])
    setTags(currentTags)
  }, [plant, plantState]);

  // TAGS
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  // PROCESSES
  const [processes, setProcesses] = useState([])
  const [selectedProcess, setSelectedProcess] = useState('')
  const [isProcessSelected, setIsProcessSelected] = useState(false);


  const handleProcessChange = (newProcess) => {
    console.log(newProcess); // Check the structure of the newProcess object in the console
    setSelectedProcess(newProcess)
    getExecutionsOfProcess(newProcess.id)
    setIsProcessSelected(true);
    setTags([]); // Reset tags when a new process is selected


  }

  useEffect(() => {
    if (isProcessSelected) {
      // Update the tags array when a process is selected
      const data = plantState[plant].tags;
      const currentTags = Object.keys(data);
      setSelectedTags([]);
      setTags(currentTags);
    }
  }, [isProcessSelected, plant, plantState]);

  const getProcessesOfPlant = (plantId) => {
    
      getProcessByPlant(plantId).then(setProcesses)
  }

  useEffect(() => {
    console.log(processes);
  }, [processes]);

  //EXECUTIONS
  const [executions, setExecutions] = useState([])
  const [selectedExecution, setSelectedExecution] = useState('')

  const handleExecutionChange = (newExecution) => {
    setSelectedExecution(newExecution)
  }

 const getExecutionsOfProcess = (processId) => {
    getExutionsByProcess(processId).then(setExecutions)
 }


  let currentOption = {}

  const getOption = () => {
    const OFFSET = 60
    if (!isPlaying) {
      return currentOption
    }
    const option = deepCopy(DEFAULT_TIME_SERIES_OPTION)
    option.legend.data = []
    selectedTags.forEach((tag) => {
      option.legend.data.push(plantState[plant]['tags'][tag])
    })
    option.grid['left'] = `${OFFSET * selectedTags.length}px`

    option.xAxis[0].data = mode === 'realtime' ? tagsState.date : delimitedData.date

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
      currentSeries.symbol = SYMBOLS[i % SYMBOLS.length]
      // currentSeries.markLine = {
      //   data: [
      //     {
      //       type: 'min',
      //       name: 'Mínimo',
      //       lineStyle: {
      //         width: 2,
      //         type: 'dotted'
      //       }
      //     },
      //     {
      //       type: 'max',
      //       name: 'Máximo',
      //       lineStyle: {
      //         width: 2,
      //         type: 'dashed'
      //       }
      //     }
      //   ]
      // };
      currentSeries.data = mode === 'realtime' ? tagsState[tag] : delimitedData[tag]
      currentSeries.symbol = SYMBOLS[i % SYMBOLS.length]
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
    setSelectedTags([])
    setPlant(event.target.value);

    getProcessesOfPlant(plantState[event.target.value].assetId)
   
  };

  const handleModeChange = (event) => {
    setIsPlaying(true)
    setMode(event.target.value);
  };

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => {
      if (mode == 'realtime' || plant == '' || dateRange.start == '' || dateRange.end == '') {
        return
      }

      const startDateLong = new Date(dateRange.start).getTime()
      const endDateLong = new Date(dateRange.end).getTime()

      if (startDateLong > endDateLong) {
        return
      }
      console.log(plant, startDateLong, endDateLong)
      getDelimitedData(plant, startDateLong, endDateLong)
        .then((data) => {
          const currentData = delimitedData
          data.forEach((currentMeasures) => {
            const tag = currentMeasures.assetId
            if (currentData[tag] == undefined) {
              currentData[tag] = []
            }
            currentMeasures.measures.forEach((current) => {
              const currentDate = moment(new Date(current.timeStamp)).format('YYYY-MM-DD HH:mm:ss')
              currentData.date.push(currentDate)
              currentData[tag].push([currentDate, current.value])
            })
          })
          setDelimitedData(currentData)
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500)
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
                {plantState[currentPlant]['plantName']}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

{
  plant && (
    <ProcessSelectionForm 
      processes={processes}
      onChange={handleProcessChange} 
    />

  ) 
}

<Box mt={2} /> 


 {isProcessSelected && (
  <ExecutionSelectionForm executions={executions} handleExecutionChange={handleExecutionChange} />
)}


<Box mt={2} /> 
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >      
          
          


        
        </Box>

      </Box>
      {(showGraphic() ) && (
        <Box>
          <ReactECharts key={selectedTags.length} option={getOption()} style={{ height: '60vh' }} />
          {mode == 'realtime' && (
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={handlePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </Box>
          )}
        </Box>
      )}
      
      
        <Box>
        <Autocomplete
          clearIcon={false}
          multiple
          disableCloseOnSelect
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
      
      
    </Box>
  )
}
