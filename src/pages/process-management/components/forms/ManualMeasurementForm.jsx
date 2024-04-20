import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Box, Button, TextField, Grid, Paper, Typography, Accordion,
    AccordionSummary, AccordionDetails, FormControlLabel, Checkbox
} from "@mui/material";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { handleBreakpoints } from "@mui/system";


const ManualMeasurementForm = ({ onNext, initialName = '', initialDescription = '' }) => {

    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);

    ManualMeasurementForm.propTypes = {
        onNext: PropTypes.func.isRequired,
        initialName: PropTypes.string,
        initialDescription: PropTypes.string
    }

    const handleSubmit = e => {
        e.preventDefault();

        onNext({ manualTagName: name, ManualTagDescription: description });
    }

    return (
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
    );
};


export default ManualMeasurementForm;


