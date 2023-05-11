import {  useState } from 'react';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import MainPlantForm from '/src/components/plant/MainPlantForm';
import TagsPlantForm from '/src/components/plant/TagsPlantForm';
import LoadPlantSvgForm from '/src/components/plant/LoadPlantSvgForm';
import MapSvgAndTagsForm from '/src/components/plant/MapSvgAndTagsForm';

const steps = [
  'INFORMACIÓN GENERAL',
  'TAGS',
  'REPRESENTACIÓN GRAFICA',
  'RELACIÓN',
];
const AddPlant = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [plant, setPlant] = useState({
    name: '',
    description: '',
    image: null,
    tags: [],
    svg: null,
    mapSvgTag: [],
  });

  const handleNext = (currentForm) => {
    const currentPlant = {...plant}
    Object.keys(currentForm).forEach((key) => {
      currentPlant[key] = currentForm[key]
    });
    setPlant(currentPlant)
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {  
    console.log(plant);
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
            onNext={handleSubmit}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container>
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

export default AddPlant;