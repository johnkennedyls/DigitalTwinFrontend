import { useState, useEffect } from 'react';
import * as ECharts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import {
  ToolboxComponent,
  DataZoomComponent,
  AxisPointerComponent,
  SingleAxisComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { Box, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useSelector } from 'react-redux';

import { deepCopy } from '../../../../utils/Funtions';
import { getDelimitedData } from '../../../../services/Api/PlantService';
import {
  getExutionsByProcess,
  getProcessByPlant
} from '../../../../services/Api/ProcessService';
import {
  DEFAULT_TIME_SERIES_OPTION,
  DEFAULT_Y_AXIS_FORMAT,
  DEFAULT_SERIES_FORMAT,
  SYMBOLS
} from '../../../../utils/Constants';

import PlantSelectionForm from './SelectionForms/PlantSelectionForm';
import ProcessSelectionForm from './SelectionForms/ProcessSelectionForm';
import ExecutionSelectionForm from './SelectionForms/ExecutionSelectionForm';
import TagSelectionForm from './SelectionForms/TagsSelectionForm';
import ChartTypeDialog from './ChartTypeDialog';

ECharts.use([
  ToolboxComponent,
  DataZoomComponent,
  AxisPointerComponent,
  LineChart,
  SingleAxisComponent
]);

export default function TimeSeries ({ edit, index, updateChart, chart, canvasId }) {
  const [chartProps, setChartProps] = useState({ ...chart, typeId: chart?.type?.typeId || '', canvasId });
  const plantState = useSelector((state) => state.plants);
  const tagsState = useSelector((state) => state.tags);
  const [processes, setProcesses] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedChartType, setSelectedChartType] = useState(chart.type || '');
  const [chartName, setChartName] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');
  const [selectedExecution, setSelectedExecution] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTags, setSelectedTags] = useState([]);

  const [mode, setMode] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [delimitedData, setDelimitedData] = useState({ date: [] });
  let currentOption = {};

  const [firstRender, setFirstRender] = useState(!(Object.keys(chartProps).length > 3));
  const [isCharged, setIsCharged] = useState(false);

  console.log('chartProps', chartProps);

  useEffect(() => {
    if (Object.keys(chartProps).length > 3) {
      setIsCharged(true);
    }
  }, []);

  useEffect(() => {
    if (edit) { updateChart(index, chartProps); }
  }, [chartProps, updateChart, index]);

  const handleSetChartType = (chartType) => {
    setSelectedChartType(chartType);
    setChartProps((prevProps) => ({ ...prevProps, typeId: chartType.typeId }));
  };

  const handleSelectName = (event) => {
    const name = event.target.value;
    setChartName(name);
    setChartProps((prevProps) => ({ ...prevProps, name }));
  };

  const handleSelectedPlant = (assetId) => {
    setSelectedPlant(assetId);
    setChartProps((prevProps) => ({ ...prevProps, assetId }));
  };

  const handleSelectProcess = (processId) => {
    setSelectedProcess(processId);
    setChartProps((prevProps) => ({ ...prevProps, processId }));
  };

  const handleSelectExecution = (execution) => {
    setSelectedExecution(execution);
    setChartProps((prevProps) => ({ ...prevProps, executionId: execution.id }));
  };

  const handleSelectTags = (tags, edit) => {
    if (tags.length === 0) {
      setSelectedTags([]);
      setChartProps((prevProps) => ({ ...prevProps, tagList: '' }));
    } else {
      setSelectedTags(tags);
      tags = tags.map(tag => plantState[selectedPlant].tags[tag]).join(', ');
      setChartProps((prevProps) => ({
        ...prevProps,
        tagList: tags,
        chartInstances: [{ paramId: selectedChartType.parameters[0].paramId, value: tags }]
      }));
    }
  };

  useEffect(() => {
    if (isCharged && selectedPlant === '') {
      handleSelectedPlant(chartProps.assetId);
      getExecutionsOfProcess(chartProps.processId);
      setDateRange({ start: chartProps.startDate, end: chartProps.endDate });
    }
  }, [plantState, isCharged]);

  useEffect(() => {
    if (selectedProcess !== '') {
      resetFlow();
    }
    if (selectedPlant) {
      getProcessByPlant(selectedPlant).then((response) => {
        setProcesses(response);
      });
      setTags(Object.keys(plantState[selectedPlant].tags));
    }
  }, [selectedPlant, plantState]);

  useEffect(() => {
    if (selectedPlant && isCharged && selectedProcess === '') {
      handleSelectProcess(chartProps.processId);
      getExecutionsOfProcess(chartProps.processId);
    }
  }, [processes]);

  useEffect(() => {
    if (executions && isCharged && !firstRender) {
      if (chartProps.executionId === -1) {
        setSelectedExecution({ id: -1 });
        handleExecutionChange('Manual');
      } else {
        const exec = executions.find(exec => exec.id === chartProps.executionId);
        setSelectedExecution(exec);
        handleExecutionChange(exec);
      }
    }
  }, [executions]);

  useEffect(() => {
    if (selectedTags.length > 0) {
      if (dateRange.start !== '' && dateRange.end !== '') {
        handleDateChange();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, selectedExecution, dateRange]);

  useEffect(() => {
    if (selectedExecution && selectedProcess && mode !== '' && isCharged) {
      addTagsWithDelay();
      setFirstRender(true);
    }
  }, [selectedExecution, selectedProcess, mode]);

  const addTagsWithDelay = async () => {
    if(chartProps.tagList) {
      const tagNames = chartProps.tagList.split(',').map(tag => tag.trim());
      const selTag = tags.filter(tag => tagNames.includes(plantState[selectedPlant].tags[tag]));
      const addedTags = [];
      for (let i = 0; i < selTag.length; i++) {
        const tag = selTag[i];
        await new Promise(resolve => setTimeout(() => {
          handleSelectTags([...addedTags, tag])
          addedTags.push(tag);
          resolve();
        }, 500));
      }
    }
  };

  const showTags = () => {
    return selectedPlant && (mode === 'realtime' || mode === 'range');
  };

  const showGraphic = () => {
    if (mode === 'realtime') {
      return tagsState.date.length > 0 && selectedTags.length > 0;
    } else {
      return delimitedData.date.length > 0 && selectedTags.length > 0;
    }
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DDTHH:mm');
  };

  const isManual = () => {
    return selectedExecution.id === -1;
  };

  const resetFlow = () => {
    handleSelectProcess('');
    handleSelectExecution('');
    setDateRange({ start: '', end: '' });
    handleSelectTags([]);
    setTags([]);
    setMode('');
    setDelimitedData({ date: [] });
  };

  const getExecutionsOfProcess = (processId) => {
    getExutionsByProcess(processId).then(
      (execs) => {
        setExecutions(execs);
      }
    );
  };

  const handleProcessChange = (newProcess) => {
    getExecutionsOfProcess(newProcess.id);
    if (firstRender) {
      handleSelectExecution('');
      setDateRange({ start: '', end: '' });
      handleSelectTags([]);
      setMode('');
      setDelimitedData({ date: [] });
    }
  };

  const handleExecutionChange = (selectedExec) => {
    if (selectedExec) {
      setDateRange({
        start: formatDate(selectedExec.startDate),
        end: formatDate(selectedExec.endDate)
      });
      if (selectedExec.state === 'running') {
        setMode('realtime');
      } else if (selectedExec.state === 'stoped') {
        setMode('range');
      } else if (selectedExec === 'Manual') {
        setMode('range');
        if (isCharged) {
          setDateRange({ start: chartProps.startDate, end: chartProps.endDate });
        } else {
          setDateRange({
            start: formatDate(executions[0].startDate),
            end: formatDate(executions[executions.length - 1].endDate)
          });
        }
      }
      setDelimitedData({ date: [] });
      if (firstRender) {
        handleSelectTags([]);
      }
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTagChange = (event, value) => {
    handleSelectTags(value);
  };

  const handleDateChange = () => {
    setTimeout(() => {
      if (
        mode === 'realtime' ||
        selectedPlant === '' ||
        dateRange.start === '' ||
        dateRange.end === ''
      ) {
        return;
      }

      const startDateLong = new Date(dateRange.start).getTime();
      const endDateLong = new Date(dateRange.end).getTime();
      setChartProps((prevProps) => ({ ...prevProps, startDate: startDateLong, endDate: endDateLong }));

      if (startDateLong > endDateLong) {
        return;
      }
      const lastTag = selectedTags[selectedTags.length - 1];
      getDelimitedData(lastTag, startDateLong, endDateLong)
        .then((data) => {
          const currentData = { date: [] };
          data.forEach((currentMeasures) => {
            const tag = currentMeasures.assetId;
            if (currentData[tag] === undefined) {
              currentData[tag] = [];
            }
            if (currentMeasures.measures.length !== 0) {
              currentMeasures.measures = currentMeasures.measures
                .slice()
                .sort((a, b) => a.timeStamp - b.timeStamp);
            }
            currentMeasures.measures.forEach((current) => {
              const currentDate = moment(new Date(current.timeStamp)).format(
                'YYYY-MM-DD HH:mm:ss'
              );
              currentData.date.push(currentDate);
              currentData[tag].push([currentDate, current.value]);
            });
          });
          setDelimitedData(prevData => ({ ...prevData, ...currentData }));
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
  };

  const handleDateChangeFromPicker = (newDate, type) => {
    const date = moment(newDate).format('YYYY-MM-DDTHH:mm');
    setDateRange(prevRange => ({
      start: type === 'start' ? date : prevRange.start,
      end: type === 'end' ? date : prevRange.end
    }));
  };

  // Executions for graphics
  const getOption = () => {
    const OFFSET = 60;
    if (!isPlaying) {
      return currentOption;
    }
    const option = deepCopy(DEFAULT_TIME_SERIES_OPTION);
    option.legend.data = [];
    selectedTags.forEach((tag) => {
      option.legend.data.push(plantState[selectedPlant].tags[tag]);
    });
    option.grid.left = `${OFFSET * selectedTags.length}px`;

    option.xAxis[0].data =
      mode === 'realtime' ? tagsState.date : delimitedData.date;

    for (let i = 0; i < selectedTags.length; i++) {
      const tag = selectedTags[i];
      const tagName = plantState[selectedPlant].tags[tag];
      const currentYaxis = deepCopy(DEFAULT_Y_AXIS_FORMAT);
      currentYaxis.offset = OFFSET * i;
      currentYaxis.axisLine.lineStyle.color = option.color[i];
      option.yAxis.push(currentYaxis);

      const currentSeries = deepCopy(DEFAULT_SERIES_FORMAT);
      currentSeries.name = tagName;
      if (mode === 'realtime') {
        const realtimeData = tagsState[tag].filter(element => element[2] === selectedExecution.id);
        currentSeries.data = realtimeData;
      } else {
        currentSeries.data = delimitedData[tag];
      }
      currentSeries.symbol = SYMBOLS[i % SYMBOLS.length];
      if (i !== 0) {
        currentSeries.yAxisIndex = i;
      }
      option.series.push(currentSeries);
    }

    currentOption = option;
    return option;
  };

  return (
    <>
      {edit && <Box
        sx={{
          position: 'absolute',
          top: 5,
          left: 10
        }}
      >
        <ChartTypeDialog selectedChartType={selectedChartType} handleSetChartType={handleSetChartType} />
      </Box>}
      {firstRender && <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={'60%'}
        mx={'auto'}
      >
        {edit &&
          (
            <TextField
              autoFocus
              variant="standard"
              placeholder="Type the chart name"
              margin="normal"
              fullWidth
              value={chartProps?.name || ''}
              onChange={handleSelectName}
              inputProps={{
                style: { fontSize: '30px', textAlign: 'center' },
                maxLength: 50
              }}
            />
          )
        }
      </Box>}
      {firstRender && <Box style={{ maxWidth: '80%', margin: 'auto' }}>
        {edit && <Box sx={{ mb: 2 }}>
          <PlantSelectionForm
            plantState={plantState}
            selectedPlant={selectedPlant}
            setSelectedPlant={handleSelectedPlant}
          />
          {selectedPlant &&
            <ProcessSelectionForm
              processes={processes}
              onChange={handleProcessChange}
              selectedProcess={selectedProcess}
              setSelectedProcess={handleSelectProcess}
            />
          }
          {selectedProcess &&
            <ExecutionSelectionForm
              executions={executions}
              onChange={handleExecutionChange}
              selectedExecution={selectedExecution}
              setSelectedExecution={handleSelectExecution}
            />
          }
          {selectedExecution && mode === 'range' &&
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-evenly' }}>
              <DateTimePicker
                label="Start Date"
                ampm={false}
                value={new Date(dateRange.start)}
                minDateTime={!isManual() && new Date(dateRange.start)}
                maxDateTime={new Date(dateRange.end)}
                onChange={(newDate) => handleDateChangeFromPicker(newDate, 'start')}
              />
              <DateTimePicker
                label="End Date"
                ampm={false}
                value={new Date(dateRange.end)}
                minDateTime={new Date(dateRange.start)}
                maxDateTime={!isManual() && new Date(dateRange.end)}
                onChange={(newDate) => handleDateChangeFromPicker(newDate, 'end')}
              />
            </Box>
          }
          {showTags() && isPlaying &&
            <TagSelectionForm
              tags={tags}
              selectedTags={selectedTags}
              handleTagChange={handleTagChange}
              plantState={plantState}
              selectedPlant={selectedPlant}
            />
          }
        </Box>}
        {showGraphic() && showTags() && (
          <Box>
            <ReactECharts
              key={selectedTags.length}
              option={getOption()}
              style={{ height: '60vh' }}
            />
            {mode === 'realtime' &&
              selectedExecution &&
              selectedExecution.state === 'running' && (
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <IconButton onClick={handlePlayPause}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>}
    </>
  );
}
