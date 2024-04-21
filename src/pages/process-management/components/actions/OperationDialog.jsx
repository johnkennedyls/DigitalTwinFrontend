import { AddTask } from "@mui/icons-material";
import { Collapse, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import AddComment from "./operations/AddComment";
import { useSelector } from "react-redux";

export default function OperationDialog({ execution, reload, setReload }) {
    const [open, setOpen] = useState(false);
    let selectProcess = useSelector(state => state.processes.processes.find(p => p.id === execution.processId));
    const [selectedOperation, setSelectedOperation] = useState('');

    const onClose = () => {
        setSelectedOperation();
        setOpen(false);
    }

    return (
        <>
            <Tooltip title="Add Operation">
                <IconButton onClick={() => setOpen(true)}>
                    <AddTask />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Add Operation to Execution of {execution.processName}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>{selectProcess?.operations.length ? 'Select Operation' : 'No operations available'}</InputLabel>
                        <Select
                            label="Select Operation"
                            onChange={(e) => setSelectedOperation(e.target.value)}
                            value={selectedOperation??''}
                            disabled={!selectProcess?.operations.length}
                        >
                            {selectProcess?.operations.map(op => (
                                <MenuItem key={op.id} value={op.id}>{op.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Collapse in={selectedOperation === 1}>
                        <AddComment execution={execution} onClose={onClose} reload={reload} setReload={setReload} />
                    </Collapse>
                </DialogContent>
            </Dialog>
        </>
    )
}

OperationDialog.propTypes = {
    execution: PropTypes.object.isRequired
}