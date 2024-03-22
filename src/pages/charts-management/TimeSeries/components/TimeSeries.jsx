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
import { Box } from '@mui/material';
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

ECharts.use([
  ToolboxComponent,
  DataZoomComponent,
  AxisPointerComponent,
  LineChart,
  SingleAxisComponent
]);

export default function TimeSeries ({edit, ...chartProps}) {
  const plantState = useSelector((state) => state.plants);
  const tagsState = useSelector((state) => state.tags);
  const [processes, setProcesses] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');
  const [selectedExecution, setSelectedExecution] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTags, setSelectedTags] = useState([]);

  const [mode, setMode] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [delimitedData, setDelimitedData] = useState({ date: [] });

  let currentOption = {};

  useEffect(() => {
    if (edit && chartProps && selectedPlant === '') {
      setSelectedPlant(chartProps.assetId);
    } else if (chartProps && selectedPlant === '') {
      setSelectedPlant(chartProps.assetId);
      setSelectedExecution(chartProps.executionId);
      getExutionsByProcess(chartProps.processId).then(
        (execs) => {
          const execution = execs.find((exec) => exec.id === chartProps.executionId)
          console.log(execution);
          setSelectedExecution(execution);
          handleExecutionChange(execution);
          addTagsWithDelay();
        }
      );
    }
  }, [plantState]);

  useEffect(() => {
    if (selectedPlant) {
      resetFlow();
      getProcessByPlant(selectedPlant).then(setProcesses);
      setTags(Object.keys(plantState[selectedPlant].tags));
    }
  }, [selectedPlant, plantState]);

  useEffect(() => {
    if (selectedPlant && chartProps && selectedProcess === '') {
      setSelectedProcess(chartProps.processId);
      getExecutionsOfProcess(chartProps.processId);
    }
  }, [processes]);

  useEffect(() => {
    if (selectedProcess && chartProps && selectedExecution === '') {
      setSelectedExecution(executions.find(exec => exec.id === chartProps.executionId));
      handleExecutionChange(executions.find(exec => exec.id === chartProps.executionId));
      addTagsWithDelay();
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

  const addTagsWithDelay = async () => {
    const tagNames = chartProps.tagList.split(',').map(tag => tag.trim());
    const selectedTags = tags.filter(tag => tagNames.includes(plantState[selectedPlant].tags[tag]));
    for (let i = 0; i < selectedTags.length; i++) {
      const tag = selectedTags[i];
      await new Promise(resolve => setTimeout(() => {
        setSelectedTags(prevSelectedTags => [...prevSelectedTags, tag]);
        resolve();
      }, 100));
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
    setSelectedProcess('');
    setSelectedExecution('');
    setDateRange({ start: '', end: '' });
    setSelectedTags([]);
    setTags([]);
    setMode('');
    setDelimitedData({ date: [] });
  };

  const getExecutionsOfProcess = (processId) => {
    getExutionsByProcess(processId).then(setExecutions);
  };

  const handleProcessChange = (newProcess) => {
    getExecutionsOfProcess(newProcess.id);
    setSelectedExecution('');
    setSelectedTags([]);
    setMode('');
    setDelimitedData({ date: [] });
  };

  const handleExecutionChange = (selectedExec) => {
    if (selectedExec) {
      if (selectedExec.state === 'running') {
        setMode('realtime');
      } else if (selectedExec.state === 'stoped') {
        setMode('range');
      } else if (selectedExec === 'Manual') {
        setMode('range');
      }
      setDelimitedData({ date: [] });
      setSelectedTags([]);
      setDateRange({
        start: formatDate(selectedExec.startDate),
        end: formatDate(selectedExec.endDate)
      });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTagChange = (event, value) => {
    setSelectedTags(value);
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
    <Box style={{ maxWidth: '80%', margin: 'auto' }}>
      {edit && <Box sx={{ mb: 2 }}>
        <PlantSelectionForm
          plantState={plantState}
          selectedPlant={selectedPlant}
          setSelectedPlant={setSelectedPlant}
        />
        {selectedPlant &&
          <ProcessSelectionForm
            processes={processes}
            onChange={handleProcessChange}
            selectedProcess={selectedProcess}
            setSelectedProcess={setSelectedProcess}
          />
        }
        {selectedProcess &&
          <ExecutionSelectionForm
            executions={executions}
            onChange={handleExecutionChange}
            selectedExecution={selectedExecution}
            setSelectedExecution={setSelectedExecution}
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
    </Box>
  );
}
