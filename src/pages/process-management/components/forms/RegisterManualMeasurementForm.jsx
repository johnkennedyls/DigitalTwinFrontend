import { useState } from "react";
import {
    Box, Button, TextField, Grid, Paper, Typography
} from "@mui/material";

import PropTypes from "prop-types";

const RegisterManualMeasurementForm = ({ onNext, initialName = '', initialDescription = '' }) => {


    const handleSubmit = e => {
        e.preventDefault();

    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={6}>
                <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Register manual measurement
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Measured value"
                            name="value"
                            value={value}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                            required
                            sx={{ my: 2 }}  
                        />

                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};



export default RegisterManualMeasurementForm;


