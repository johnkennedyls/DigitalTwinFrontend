import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
    Box, Button, IconButton, TextField, Tooltip, Dialog, DialogTitle,
    DialogContent, InputLabel, MenuItem, FormControl, Select
} from "@mui/material";
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import { getManualMeasurementsByProcess } from "../../../../services/Api/ProcessService";
import { registerManualMeasurement } from "../../../../services/Api/MeasuresService";
import PropTypes from "prop-types";

const RegisterManualMeasurementForm = ({ executionId }) => {

    const{ processId }= useParams();

    const [selectedTag, setSelectedTag] = useState('');
    const[measuredValue, setMeasuredValue] = useState('');
    
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const[open, setOpen] = useState(false)
    const [manualMeasurements, setManualMeasurements] = useState([]);

    const handleClickOpen = e => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getManualMeasurementsByProcess(processId)
        .then((manualMeasurements) => {
            setManualMeasurements(manualMeasurements)
        })
        .catch(error => {
            console.error(error)
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        registerManualMeasurement(
            {
                assetId: selectedTag,
                value: measuredValue,
                execId: executionId,
                timeStamp: currentDateTime.getTime()
            }
        )
        .then(() => {
            handleClose()
        })
        .catch(error => {
            console.error(error)
        });
    }
    
    const handleChange = (e) => {
        setSelectedTag(e.target.value);
    };

    return (
        <>  
            <Tooltip title="Register manual measurement">
                <IconButton
                color="primary"
                onClick={handleClickOpen}
                >
                    <SquareFootIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}
            maxWidth="sm"
            fullWidth={true}
            >
                <DialogTitle variant="h6" fontWeight="bold">
                    Register manual measurement
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ mt: 1}}>
                            <InputLabel>Manual Tag</InputLabel>
                            {manualMeasurements.map((measurement, index) => (
                            <Select
                            key={index}
                            value={selectedTag}
                            label="Manual Tag"
                            required
                            onChange={handleChange}
                            >
                                <MenuItem value={measurement.assetId}>{measurement.name}</MenuItem>
                            </Select>
                            ))}
                        </FormControl>
                        <TextField
                            label="Measured Value"
                            name="measured value"
                            value={measuredValue}
                            onChange={e => setMeasuredValue(e.target.value)}
                            fullWidth
                            required
                            sx={{ my: 2}}
                        />
                        <DateTimePicker sx={{width: '100%'}}
                            label="Date & time"
                            value={currentDateTime}
                            onChange={(newDate) => setCurrentDateTime(newDate)}
                        />
                        <Box display="flex" justifyContent="center" width="100%" sx={{ mt: 4 }}>
                            <Button type="submit" variant="contained">
                                Register
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};


export default RegisterManualMeasurementForm;


