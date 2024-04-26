import { Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export default function RemoveButton ({ onClick, disable }) {
  return (
    <Tooltip title="Remove">
      <IconButton
        disabled={disable}
        color="secondary"
        onClick={onClick}
      >
        <Delete />
      </IconButton>
    </Tooltip>
  );
}
