import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import moment from 'moment';

function ExecutionSelectionForm ({ executions, onChange, selectedExecution, setSelectedExecution }) {
  const handleChange = (event) => {
    if (event.target.value !== -1) {
      const execution = executions.find(exec => exec.id === event.target.value);
      setSelectedExecution(execution);
      onChange(execution);
    } else {
      setSelectedExecution({ id: -1 });
      onChange('Manual');
    }
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="execution-select-label">Select Execution</InputLabel>
      <Select
        labelId="execution-select-label"
        id="execution-select"
        value={selectedExecution?.id??''}
        onChange={handleChange}
        label="Select Execution"
      >
        <MenuItem key={-1} value={-1}>
          Manual
        </MenuItem>
        {executions.map((execution) => {
          const startDateL = moment(execution.startDate).format('DD/MM/YYYY HH:mm');
          const endDateL = moment(execution.endDate).format('DD/MM/YYYY HH:mm');
          if (execution.state === 'running') {
            return (
              <MenuItem key={execution.id} value={execution.id}>
                {startDateL} - En curso
              </MenuItem>
            );
          }
          return (
            <MenuItem key={execution.id} value={execution.id}>
              {startDateL} - {endDateL}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default ExecutionSelectionForm;
