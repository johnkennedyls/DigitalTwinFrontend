import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


function ProcessSelectionForm({ processes }) {
  const [selectedProcess, setSelectedProcess] = useState('');

  const handleChange = (event) => {
    setSelectedProcess(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="process-select-label">Proceso</InputLabel>
      <Select
        labelId="process-select-label"
        id="process-select"
        value={selectedProcess}
        onChange={handleChange}
      >
        {processes.map((process) => (
          <MenuItem key={process.id} value={process.id}>
            {process.name}
            
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProcessSelectionForm;