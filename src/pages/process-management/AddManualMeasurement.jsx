import { useHistory } from 'react-router-dom';

import { addManualMeasurement } from '../../services/Api/ProcessService';
import ManualMeasurementForm from './components/forms/AddManualMeasurementForm';


export default function AddManualMeasurement () {
    const history = useHistory();

    const handleNext = (manualMeasurementData) => {
        console.log(manualMeasurementData);
        addManualMeasurement(manualMeasurementData)
        .then(() => {
            history.push('add-process');
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (    
        <ManualMeasurementForm
            onNext={handleNext}
        />
    );
}