import { Autocomplete, TextField, Box, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function TagSelectionForm ({ tags, selectedTags, handleTagChange, plantState, selectedPlant }) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Autocomplete
        clearIcon={false}
        multiple
        disableCloseOnSelect
        options={tags}
        value={selectedTags}
        onChange={handleTagChange}
        getOptionLabel={(option) => plantState[selectedPlant].tags[option]}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option in plantState[selectedPlant].tags ? plantState[selectedPlant].tags[option] : option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Tags"
            placeholder="Tags"
          />
        )}
        fullWidth
      />
    </Box>
  );
}

export default TagSelectionForm;
