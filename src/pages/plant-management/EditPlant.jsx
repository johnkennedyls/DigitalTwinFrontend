import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Stepper, Step, StepLabel } from '@mui/material';

import { editPlant, getPlantData } from '../../services/Api/PlantService';
import { ErrorAlert, SuccessAlert } from '../../components/utils/Alert';

import MainPlantForm from './components/MainPlantForm';
import TagsPlantForm from './components/TagsPlantForm';
import LoadPlantSvgForm from './components/LoadPlantSvgForm';

const steps = ['INFORMACIÓN GENERAL', 'REPRESENTACIÓN GRAFICA', 'TAGS'];

const EditPlant = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [plant, setPlant] = useState({});

  const { plantId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getPlantData(plantId).then((data) => {
      setPlant(data);
    }).catch((error) => {
      console.error(error);
    });
  }, [plantId]);

  const handleBack = (currentForm = undefined) => {
    if (currentForm) {
      const currentPlant = { ...plant };
      Object.keys(currentForm).forEach((key) => {
        currentPlant[key] = currentForm[key];
      });
      setPlant(currentPlant);
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = (currentForm, submit = false) => {
    const currentPlant = { ...plant };
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
    currentPlant.tags = [...currentPlant.tags, ...currentPlant.removedTags];
    editPlant(currentPlant, plantId).then(() => {
      SuccessAlert('Planta editada correctamente');
      history.push('/manage-plant');
    }).catch((error) => {
      console.error(error);
      ErrorAlert('An error has occurred. The plant could not be edited.');
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
    case 0:
      return <MainPlantForm
        processLabel='edit'
        onNext={handleNext}
        plantName={plant.plantName}
        plantDescription={plant.plantDescription}
        plantPhoto={plant.plantPhoto}
        plantIp={plant.plantIp}
        plantSlot={plant.plantSlot}
      />;
    case 1:
      return <LoadPlantSvgForm
        processLabel='edit'
        onNext={handleNext}
        onBack={handleBack}
        svgImageUrl={plant.svgImage}
        conventions={plant.conventions}
        prevMapSvgTag={plant.mapSvgTag}
      />;
    case 2:
      return <TagsPlantForm processLabel='edit' onNext={handleNext} onBack={handleBack} currentTags={plant.tags} svgIds={plant.mapSvgTag} />;
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

export default EditPlant;
