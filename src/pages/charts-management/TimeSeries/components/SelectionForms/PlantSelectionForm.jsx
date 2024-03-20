import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function PlantSelectionForm ({ plantState, plants, onChange, selectedPlant, setSelectedPlant }) {
  const handleChange = (event) => {
    setSelectedPlant(event.target.value);
    onChange(plants.find(plant => plant === event.target.value.toString()));
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>Select Plant</InputLabel>
      <Select
        labelId="plant-select-label"
        id="plant-select"
        value={selectedPlant}
        onChange={handleChange}
        label="Select Plant"
      >
        {plants.map((plant) => (
          <MenuItem key={plant} value={plant}>
            {plantState[plant].plantName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PlantSelectionForm;
