import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function PlantSelectionForm ({ plants }) {
  const [selectedPlant, setSelectedPlant] = useState('');

  const handleChange = (event) => {
    setSelectedPlant(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="plant-select-label">Planta</InputLabel>
      <Select
        labelId="plant-select-label"
        id="plant-select"
        value={selectedPlant}
        onChange={handleChange}
      >
        {plants.map((plant) => (
          <MenuItem key={plant.id} value={plant.id}>
            {plant.plantName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PlantSelectionForm;
