import { useState } from "react";
import { useEffect } from "react";
import {
    Box, Button, IconButton, TextField, Tooltip, Dialog, DialogTitle,
    DialogContent, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

import PropTypes from "prop-types";

const RegisterManualMeasurementForm = () => {

    const[name, setName] = useState('')
    const[currentDateTime, setCurrentDateTime] = useState('')
    const[open, setOpen] = useState(false)
    const[isAccordionExpanded, setIsAccordionExpanded] = useState(false)

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
    }, []);

    const handleSubmit = () => {
        e.preventDefault();
        
        //register manual measurement back end method

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
                            ></AccordionSummary>
                            <AccordionDetails>
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


