import { useHistory } from "react-router-dom";
import MainProcessForm from "/src/components/process/forms/MainProcessForm"

import { addProcess } from "../../services/ProcessService"

export default function AddProcess() {

  const history = useHistory();
  const basePath = import.meta.env.VITE_DASHBOARD_BASE_PATH;

  const handleNext = (processData) => {
    addProcess(processData)
      .then(() => {
        // window.location.href = '/dashboard/manage-process';
        history.push(`/manage-process`);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <MainProcessForm
      onNext={handleNext}
    />
  )
}
