import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Stepper, Step, StepLabel } from '@mui/material';

import MainPlantForm from '../../components/plant/MainPlantForm';
import TagsPlantForm from '../../components/plant/TagsPlantForm';
import LoadPlantSvgForm from '../../components/plant/LoadPlantSvgForm';
import { addPlant } from '../../services/PlantService';
import { ErrorAlert, SuccessAlert } from '../../components/utils/Alert';

const steps = ['INFORMACIÓN GENERAL', 'REPRESENTACIÓN GRAFICA', 'TAGS'];
const AddPlant = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [plant, setPlant] = useState({});

  const history = useHistory();

  const handleBack = (currentForm = undefined) => {
    if (currentForm) {
      const currentPlant = { ...plant };
      Object.keys(currentForm).forEach((key) => {
        currentPlant[key] = currentForm[key];
      });
      setPlant(currentPlant);
      console.log('BACK', currentPlant);
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = (currentForm, submit = false) => {
    const currentPlant = { ...plant };
    console.log('RECEIVED ', currentForm);
    Object.keys(currentForm).forEach((key) => {
      currentPlant[key] = currentForm[key];
    });
    setPlant(currentPlant);

    if (!submit) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      handleSubmit(currentPlant);
    }
  };

  const handleSubmit = (currentPlant) => {
    console.log('SUBMIT', currentPlant);
    addPlant(currentPlant).then(() => {
      history.push('/manage-plant');
      SuccessAlert('Planta creada correctamente');
    }).catch((error) => {
      console.error(error);
      ErrorAlert('Ha ocurrido un error. No se ha podido crear la planta');
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
    case 0:
      return <MainPlantForm
        onNext={handleNext}
        plantName={plant.plantName}
        plantDescription={plant.plantDescription}
        plantPhoto={plant.plantPhoto}
        plantIp={plant.plantIp}
        plantSlot={plant.plantSlot}
      />;
    case 1:
      return <LoadPlantSvgForm onNext={handleNext} onBack={handleBack} svgImageUrl={plant.svgImage} conventions={plant.conventions} prevMapSvgTag={plant.mapSvgTag} />;
    case 2:
      return <TagsPlantForm onNext={handleNext} onBack={handleBack} currentTags={plant.tags} svgIds={plant.mapSvgTag}/>;
    default:
      throw new Error('Unknown step');
    }
  };

  return (
    <>
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
    </>
  );
};

export default AddPlant;
