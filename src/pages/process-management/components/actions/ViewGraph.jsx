import { Addchart } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { setCreatingCanvas } from "../../../../reducers/graphic/canvaSlice";

export default function ViewGraph ({ param }) {
    const dispatch = useDispatch();

    const handleViewGraph = () => {
        const info = {
          executionId: param.id,
          processId: param.processId
        }
        dispatch(setCreatingCanvas(info));
        window.open('/dashboard/create-charts', '_blank');
    }

    return (
        <Tooltip title="View Graph">
            <IconButton onClick={handleViewGraph}>
                <Addchart />
            </IconButton>
        </Tooltip>
    )
}

ViewGraph.propTypes = {
    param: PropTypes.object.isRequired
};