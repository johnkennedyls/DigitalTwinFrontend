import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ExecutionSelectionForm ({ executions, onChange }) {
  const [selectedExecution, setSelectedExecution] = useState('');

  const handleChange = (event) => {
    const selectedExecutionId = event.target.value;
    const selectedExecutionDetails = executions.find(execution => execution.id === selectedExecutionId);

    onChange(selectedExecutionDetails);
    setSelectedExecution(selectedExecutionId);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="execution-select-label">Ejecución</InputLabel>
      <Select
        labelId="execution-select-label"
        id="execution-select"
        value={selectedExecution}
        onChange={handleChange}
      >
        {executions.map((execution) => (
          <MenuItem key={execution.id} value={execution.id}>
            {execution.id}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ExecutionSelectionForm;
