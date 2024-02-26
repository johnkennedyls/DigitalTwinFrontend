import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TagSelectionForm = ({ tags }) => {
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>Tag</InputLabel>
      <Select value={selectedTag} onChange={handleTagChange} label="Tag">
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagSelectionForm;