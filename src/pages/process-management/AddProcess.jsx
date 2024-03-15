import { useHistory } from 'react-router-dom';

import { addProcess } from '../../services/Api/ProcessService';

import MainProcessForm from './components/forms/MainProcessForm';

export default function AddProcess () {
  const history = useHistory();

  const handleNext = (processData) => {
    addProcess(processData)
      .then(() => {
        history.push('/manage-process');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <MainProcessForm
      onNext={handleNext}
    />
  );
}
