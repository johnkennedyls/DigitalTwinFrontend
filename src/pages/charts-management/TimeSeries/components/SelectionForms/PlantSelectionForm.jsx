import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function PlantSelectionForm ({ plantState, selectedPlant, setSelectedPlant }) {
  const handleChange = (event) => {
    setSelectedPlant(event.target.value);
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
        {Object.values(plantState).map((plant) => (
          <MenuItem key={plant.assetId} value={plant.assetId}>
            {plant.plantName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PlantSelectionForm;
