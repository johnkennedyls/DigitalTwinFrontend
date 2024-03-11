import { useState } from 'react';

import PlantSelectionForm from './PlantSelectionForm';
import ProcessSelectionForm from './ProcessSelectionForm';
import ExecutionSelectionForm from './ExecutionSelectionForm';
import TagSelectionForm from './TagSelectionForm';

function FilterForm ({ plants, processes, executions, tags }) {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');
  const [selectedExecution, setSelectedExecution] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handlePlantChange = (plant) => {
    setSelectedPlant(plant);
    setSelectedProcess('');
    setSelectedExecution('');
    setSelectedTags([]);
  };

  const handleProcessChange = (process) => {
    setSelectedProcess(process);
    setSelectedExecution('');
    setSelectedTags([]);
  };

  const handleExecutionChange = (execution) => {
    setSelectedExecution(execution);
    setSelectedTags([]);
  };

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
  };

  return (
    <div>
      <PlantSelectionForm plants={plants} onChange={handlePlantChange} />
      {selectedPlant && <ProcessSelectionForm processes={processes} onChange={handleProcessChange} />}
      {selectedProcess && <ExecutionSelectionForm executions={executions} onChange={handleExecutionChange} />}
      {selectedExecution && <TagSelectionForm tags={tags} onChange={handleTagChange} />}
    </div>
  );
}

export default FilterForm;
