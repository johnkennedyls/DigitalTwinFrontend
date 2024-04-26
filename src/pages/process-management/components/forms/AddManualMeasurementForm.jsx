import { useState } from "react";
import PropTypes from "prop-types";
import {
    Box, Button, TextField,
    Dialog, DialogContent, DialogTitle
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const ManualMeasurementForm = ({ onManualTagAdd, initialName = '', initialDescription = '' }) => {

    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [open, setOpen] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        onManualTagAdd(
            {
                name: name,
                description: description
            }
        );
        handleClose();
        e.stopPropagation(); 
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        setOpen(false);
    };

    return (
        <>  
            <Box mt={3}>
                <Button 
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen}
                >
                    Add manual tag
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h6" fontWeight="bold">
                    Add manual tag
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            required
                            sx={{ my: 2 }}  
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                            required
                            sx={{ my: 2 }}  
                        />
                        <Box display="flex" justifyContent="center" width="100%" sx={{ mt: 4 }}>
                            <Button type="submit" variant="contained">
                                Save
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

ManualMeasurementForm.propTypes = {
    initialName: PropTypes.string,
    initialDescription: PropTypes.string
};

export default ManualMeasurementForm;


