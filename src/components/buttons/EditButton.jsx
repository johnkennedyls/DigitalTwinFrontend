import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function EditButton({ onClick, disable }) {
  return (
    <Tooltip title="Edit" >
      <IconButton
        disabled={disable}
        color="primary"
        onClick={onClick}
      >
        <Edit />
      </IconButton>
    </Tooltip>
  )
} 