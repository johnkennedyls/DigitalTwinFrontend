import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const MainProcessForm = ({ onNext, initialName = '', initialDescription = '', initialSelected = [] }) => {
  const plantState = useSelector(state => state.plants);

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [selectedAssets, setSelectedAssets] = useState(initialSelected);

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

    onNext({ processName: name, processDescription: description, selectedAssets: finalSelectedAssets });
  };

  return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={6}>
                <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Agregar proceso
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre del proceso"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Descripción del proceso"
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
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
                            Agregar proceso
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
  initialSelected: PropTypes.arrayOf(PropTypes.number)
};

export default MainProcessForm;
