import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Box, Button, TextField, Grid, Paper, Typography,
    Dialog
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { addManualMeasurement } from "../../../../services/Api/ProcessService/";

const ManualMeasurementForm = ({initialName = '', initialDescription = '' }) => {

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
        .then(() => {
            history.push('add-process');
        })
        .catch(error => {
            console.error(error);
        });
    }

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button 
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                add manual tag
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Add manual tag
                            </Typography>
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
                        </Paper>
                    </Grid>   
                </Grid>
            </Dialog>
        </>
    );
};

ManualMeasurementForm.propTypes = {
    initialName: PropTypes.string,
    initialDescription: PropTypes.string
};

export default ManualMeasurementForm;


