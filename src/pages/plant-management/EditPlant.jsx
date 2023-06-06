import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import MainPlantForm from '/src/components/plant/MainPlantForm';
import TagsPlantForm from '/src/components/plant/TagsPlantForm';
import LoadPlantSvgForm from '/src/components/plant/LoadPlantSvgForm';
import MapSvgAndTagsForm from '/src/components/plant/MapSvgAndTagsForm';
import AlertMessage from '../../components/messages/AlertMessage';

import { useMessage } from '/src/providers/MessageContext';

import { editPlant, getPlantData } from '/src/services/PlantService'

const steps = [
  'INFORMACIÓN GENERAL',
  'TAGS',
  'REPRESENTACIÓN GRAFICA',
  'RELACIÓN',
];
const EditPlant = () => {
  const { plantId } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });


  const [plant, setPlant] = useState({
    plantName: '',
    plantDescription: '',
    conventions: '',
    plantPhoto: null,
    tags: [{ name: '', descroption: '' }],
    removedTags: [],
    svgImage: null,
    mapSvgTag: [],
    plantIp: '',
    plantSlot: ''
  });

  const { showMessage } = useMessage();
  const history = useHistory();
  const basePath = import.meta.env.VITE_DASHBOARD_BASE_PATH;

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
    console.log("CURRENT PLANT", currentPlant)
    setPlant(currentPlant)

    if (!submit) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      handleSubmit(currentPlant);
    }
  };

  const handleSubmit = (currentPlant) => {
    currentPlant.tags = [...currentPlant.tags, ...currentPlant.removedTags]
    console.log("SUBMIT", currentPlant)
    editPlant(currentPlant, plantId).then(() => {
      showMessage("Editado correctamente");
      history.push(`/manage-plant`);
    }).catch((error) => {
      console.error(error);
      let message = 'Ha ocurrido un error. No se ha podido editar la planta';
      let severity = 'error';
      setAlert({ show: true, message: message, severity: severity });
    });
  };

  const handleCloseAlert = () => {
    setAlert(prevState => ({ ...prevState, show: false }));
  }
  
  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <MainPlantForm processLabel='edit' onNext={handleNext} plantName={plant.plantName} plantDescription={plant.plantDescription} plantPhoto={plant.plantPhoto} plantIp={plant.plantIp} plantSlot={plant.plantSlot} />;
      case 1:
        return <TagsPlantForm processLabel='edit' onNext={handleNext} onBack={handleBack} currentTags={plant.tags} />;
      case 2:
        return <LoadPlantSvgForm processLabel='edit' onNext={handleNext} onBack={handleBack} svgImageUrl={plant.svgImage} conventions={plant.conventions} />;
      case 3:
        return (
          <MapSvgAndTagsForm
            processLabel='edit'
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
        <div>
          <AlertMessage 
              open={alert.show} 
              message={alert.message} 
              severity={alert.severity} 
              handleClose={handleCloseAlert}
            />  
        </div>
    </>
  );
};

export default EditPlant;