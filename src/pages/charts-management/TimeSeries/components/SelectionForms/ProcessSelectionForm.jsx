import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ProcessSelectionForm ({ processes, onChange, selectedProcess, setSelectedProcess }) {
  const handleChange = (event) => {
    setSelectedProcess(event.target.value);
    onChange(processes.find(process => process.id === event.target.value));
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="process-select-label">Proceso</InputLabel>
      <Select
        labelId="process-select-label"
        id="process-select"
        value={selectedProcess}
        onChange={handleChange}
        label="Proceso"
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
