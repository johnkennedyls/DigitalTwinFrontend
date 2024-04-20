import { useHistory } from 'react-router-dom';

import { addManualMeasurement } from '../../services/Api/ProcessService';

import MainProcessForm from './components/forms/MainProcessForm';

export default function addManualMeasurement () {

    const handleNext = (manualMeasurementData) => {
        addManualMeasurement(manualMeasurementData)
            .then(() => {
                history.pushState('/manage-process')
            })
            .catch(error => {
                console.error(error);
            });
    } ;

    return (
        <MainProcessForm
            onNext={handleNext}
        />
    );
}