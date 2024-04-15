import { Save } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export default function SaveButton ({ onClick, disable }) {
  return (
    <Tooltip title="Save">
      <IconButton
        disabled={disable}
        color="primary"
        onClick={onClick}
      >
        <Save />
      </IconButton>
    </Tooltip>
  );
}
