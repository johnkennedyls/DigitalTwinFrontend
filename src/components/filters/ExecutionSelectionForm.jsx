import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ExecutionSelectionForm({ executions }) {
  const [selectedExecution, setSelectedExecution] = useState('');

  const handleChange = (event) => {
    setSelectedExecution(event.target.value);
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
            {execution.processName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ExecutionSelectionForm;