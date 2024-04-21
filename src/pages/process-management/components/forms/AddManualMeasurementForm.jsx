import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Box, Button, TextField, Typography,
    Dialog, DialogContent, DialogTitle
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { addManualMeasurement } from "../../../../services/Api/ProcessService/";

const ManualMeasurementForm = ({ onManualTagAdd, initialName = '', initialDescription = '' }) => {

    const history = useHistory();

    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [open, setOpen] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        addManualMeasurement(   
            {
                name: name,
                description: description
            }
        )
        .then((response) => {
            if (response) {
                onManualTagAdd(response); 
                handleClose(); 
              }
            history.push('add-process');
        })
        .catch(error => {
            console.error(error);
        });
        //The next line is used when you make click on the save button of this form, it will not trigger the click event of the parent component
        e.stopPropagation(); 
    }

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
                    add manual tag
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


