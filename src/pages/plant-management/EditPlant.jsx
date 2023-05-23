import { useState } from 'react';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import MainPlantForm from '/src/components/plant/MainPlantForm';
import TagsPlantForm from '/src/components/plant/TagsPlantForm';
import LoadPlantSvgForm from '/src/components/plant/LoadPlantSvgForm';
import MapSvgAndTagsForm from '/src/components/plant/MapSvgAndTagsForm';

import { addPlant } from '/src/services/PlantService'

const steps = [
  'INFORMACIÓN GENERAL',
  'TAGS',
  'REPRESENTACIÓN GRAFICA',
  'RELACIÓN',
];
const EditPlant = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [plant, setPlant] = useState({
    plantName: '',
    plantDescription: '',
    conventions: '',
    plantPhoto: null,
    tags: [],
    svgImage: null,
    mapSvgTag: [],
  });

  const handleNext = (currentForm, submit = false) => {
    const currentPlant = { ...plant }
    console.log("RECEIVED ", currentForm)
    Object.keys(currentForm).forEach((key) => {
      currentPlant[key] = currentForm[key]
    });
    setPlant(currentPlant)
    console.log(currentPlant);

    if (!submit) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    addPlant(plant).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <MainPlantForm onNext={handleNext} />;
      case 1:
        return <TagsPlantForm onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <LoadPlantSvgForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return (
          <MapSvgAndTagsForm
            svgIds={plant.mapSvgTag}
            tags={plant.tags}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container style={{ marginTop: '5rem' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}
    </Container>
  );
};

export default EditPlant;