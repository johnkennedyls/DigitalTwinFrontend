import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import MainPlantForm from '/src/components/plant/MainPlantForm';
import TagsPlantForm from '/src/components/plant/TagsPlantForm';
import LoadPlantSvgForm from '/src/components/plant/LoadPlantSvgForm';
import MapSvgAndTagsForm from '/src/components/plant/MapSvgAndTagsForm';

import { editPlant, getPlantData } from '/src/services/PlantService'

const steps = [
  'INFORMACIÓN GENERAL',
  'TAGS',
  'REPRESENTACIÓN GRAFICA',
  'RELACIÓN',
];
const EditPlant = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { plantId } = useParams();



  const [plant, setPlant] = useState({
    plantName: '',
    plantDescription: '',
    conventions: '',
    plantPhoto: null,
    tags: [{ name: '', descroption: '' }],
    svgImage: null,
    mapSvgTag: [],
  });

  useEffect(() => {
    getPlantData(plantId).then((data) => {
      setPlant(data)
    }).catch((error) => {
      console.error(error);
    });
  }, [plantId]);

  const handleBack = (currentForm = undefined) => {

    if (currentForm) {
      const currentPlant = { ...plant }
      Object.keys(currentForm).forEach((key) => {
        currentPlant[key] = currentForm[key]
      });
      setPlant(currentPlant)
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = (currentForm, submit = false) => {
    const currentPlant = { ...plant }
    console.log("RECEIVED ", currentForm)
    Object.keys(currentForm).forEach((key) => {
      currentPlant[key] = currentForm[key]
    });
    setPlant(currentPlant)

    if (!submit) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      handleSubmit(currentPlant);
    }
  };

  const handleSubmit = (currentPlant) => {
    console.log("SUBMIT", currentPlant)
    editPlant(currentPlant, plantId).then((response) => {
      window.location.href = '/dashboard/manage-plant';
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <MainPlantForm onNext={handleNext} plantName={plant.plantName} plantDescription={plant.plantDescription} plantPhoto={plant.plantPhoto} />;
      case 1:
        return <TagsPlantForm onNext={handleNext} onBack={handleBack} currentTags={plant.tags} />;
      case 2:
        return <LoadPlantSvgForm onNext={handleNext} onBack={handleBack} svgImageUrl={plant.svgImage} conventions={plant.conventions} />;
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