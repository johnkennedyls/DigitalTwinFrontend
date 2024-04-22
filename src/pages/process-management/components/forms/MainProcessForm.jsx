import { useState } from 'react';
import {
  Button, TextField, Grid, Paper, Typography, Accordion,
  AccordionSummary, AccordionDetails, FormControlLabel, Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


import AddManualMeasurementForm from "./AddManualMeasurementForm";


const MainProcessForm = ({ onNext, initialName = '', initialDescription = '', initialSelected = [], initialManualTags = [] }) => {
  
  const plantState = useSelector(state => state.plants);
  
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [selectedAssets, setSelectedAssets] = useState(initialSelected);
  const [manualTags, setManualTags] = useState(initialManualTags);

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  
  const handleCheck = (assetId) => {
    const alreadySelected = selectedAssets.includes(assetId);
    if (alreadySelected) {
      setSelectedAssets(selectedAssets.filter(s => s !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const selectedPlantsAssetId = Object.keys(plantState)
      .filter(plantId => selectedAssets.includes(plantState[plantId].assetId))
      .map(plantId => plantState[plantId].assetId);

    const filteredTags = [];
    Object.keys(plantState).forEach(plantId => {
      Object.keys(plantState[plantId].tags).forEach(assetId => {
        if (selectedAssets.includes(Number(assetId)) && !selectedPlantsAssetId.includes(plantState[plantId].assetId)) {
          filteredTags.push(Number(assetId));
        }
      });
    });

    let finalSelectedAssets = [...new Set([...selectedPlantsAssetId, ...filteredTags])];
    finalSelectedAssets = finalSelectedAssets.map(assetId => parseInt(assetId));

    onNext({ processName: name, processDescription: description, selectedAssets: finalSelectedAssets, manualTags: manualTags });
  };

  const addManualTag = (tag) => {
    setManualTags([...manualTags, tag]);
  };

  return (
    <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3} sx={{ p: 4, my: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Add process
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Process name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Process description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              {Object.keys(plantState).map((plantKey) => (
                <Accordion key={plantState[plantKey].assetId}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedAssets.includes(plantState[plantKey].assetId)}
                          onChange={() => handleCheck(plantState[plantKey].assetId)}
                        />
                      }
                      label={plantState[plantKey].plantName}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    {Object.keys(plantState[plantKey].tags).map((assetId) => (
                      <FormControlLabel
                        key={assetId}
                        control={
                          <Checkbox
                            disabled={selectedAssets.includes(plantState[plantKey].assetId)}
                            checked={selectedAssets.includes(Number(assetId))}
                            onChange={() => handleCheck(Number(assetId))}
                          />
                        }
                        label={plantState[plantKey].tags[assetId]}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
              <Accordion
                expanded={isAccordionExpanded}
                onChange={(event, isExpanded) => setIsAccordionExpanded(isExpanded)}
                sx={{ mt: 4 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Manual measurements
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: isAccordionExpanded ? '#f6f6f6' : 'inherit' }}>
                  {manualTags.map((tag, index) => (
                  <Typography key={index}>
                    {tag.id} - {tag.name}: {tag.description}
                  </Typography>
                  ))}
                  <AddManualMeasurementForm 
                    onManualTagAdd={addManualTag}
                  />
                </AccordionDetails>
              </Accordion>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
                Add process
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
  );
};

MainProcessForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  initialName: PropTypes.string,
  initialDescription: PropTypes.string,
  initialSelected: PropTypes.arrayOf(PropTypes.number),
  initialManualTags: PropTypes.arrayOf(PropTypes.number)
};

export default MainProcessForm;
