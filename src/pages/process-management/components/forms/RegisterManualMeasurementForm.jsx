import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
    Box, Button, IconButton, TextField, Tooltip, Dialog, DialogTitle,
    DialogContent, Accordion, AccordionSummary, AccordionDetails, 
    Typography, FormControlLabel, Checkbox
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

import { getManualMeasurementsByProcess } from "../../../../services/Api/ProcessService";

import PropTypes from "prop-types";

const RegisterManualMeasurementForm = () => {

    const history = useHistory();
    const{ processId }= useParams();

    const[name, setName] = useState('')
    const[currentDateTime, setCurrentDateTime] = useState('')
    const[open, setOpen] = useState(false)
    const[isAccordionExpanded, setIsAccordionExpanded] = useState(false)

    const [manualMeasurements, setManualMeasurements] = useState([]);


    const handleClickOpen = e => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const currentDateTime = new Date().toLocaleString();
        setCurrentDateTime(currentDateTime);
        getManualMeasurementsByProcess(processId)
        .then((manualMeasurements) => {
            setManualMeasurements(manualMeasurements)
        })
        .catch(error => {
            console.error(error)
        });
    }, []);

    const handleSubmit = () => {
        e.preventDefault();
        getManualMeasurements()
        e.stopPropagation()
    }

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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h6" fontWeight="bold">
                    Register manual measurement
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Accordion
                            expanded={isAccordionExpanded}
                            onChange={(event, isExpanded) => setIsAccordionExpanded(isExpanded)}
                            sx={{ mt: 4}}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>
                                    Manual Tag
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {manualMeasurements.map((measurement, index) => (
                                    <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                        // Ajusta estas propiedades según tus necesidades
                                        />
                                    }   
                                    label={measurement.name} // Reemplaza 'someProperty' con la propiedad que quieres mostrar
                                    />
                                ))}
                            </AccordionDetails>
                        </Accordion>

                        <TextField
                            label="Measured Value"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            required
                            sx={{ my: 2}}
                        />
                        <TextField
                            label="Current Date & Time"
                            name="currentDateTime"
                            value={currentDateTime}
                            onChange={e => setCurrentDateTime(e.target.value)}
                            fullWidth
                            required
                            disabled
                            sx={{ my: 2}}
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


