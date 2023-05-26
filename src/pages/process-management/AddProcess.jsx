import MainProcessForm from "/src/components/process/forms/MainProcessForm"

import { addProcess } from "../../services/ProcessService"

export default function AddProcess() {

    const handleNext = (processData) => {
        addProcess(processData)
            .then(() => {
              window.location.href = '/dashboard/manage-processes';
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
