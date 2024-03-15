import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function PlantSelectionForm ({ plants, onChange }) {
  const [selectedPlant, setSelectedPlant] = useState('');

  const handleChange = (event) => {
    setSelectedPlant(event.target.value);
    onChange(plants.find(plant => plant.id === event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="plant-select-label">Seleccione Planta</InputLabel>
      <Select
        labelId="plant-select-label"
        id="plant-select"
        value={selectedPlant}
        onChange={handleChange}
        label="Proceso"
      >
        {plants.map((plant) => (
          <MenuItem key={plant.id} value={plant.id}>
            {plant.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PlantSelectionForm;
