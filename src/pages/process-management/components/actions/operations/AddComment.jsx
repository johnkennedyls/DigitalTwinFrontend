import { Button, DialogActions, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import { applyOperation } from "../../../../../services/Api/OperationService";

export default function AddComment({ execution, onClose, reload, setReload }) {
    const [comment, setComment] = useState('');

    const handleClose = () => {
        setComment('');
        onClose();
    }

    const handleSubmit = () => {
        applyOperation({
            operId: 1,
            execId: execution.id,
            parameters: [
                {
                    paramId: 1,
                    value: comment
                }
            ]
        }).then(() => {
            setReload(!reload);
            handleClose();
        });
    }

    return (
        <>
            <TextField
                label="Comment"
                multiline
                rows={4}
                fullWidth
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                variant="outlined"
            />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </>
    )
}

AddComment.propTypes = {
    execution: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}