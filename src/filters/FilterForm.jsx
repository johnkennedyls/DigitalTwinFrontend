import { useState } from 'react';
import PlantSelectionForm from '../filters/PlantSelectionForm';
import ProcessSelectionForm from '../filters/ProcessSelectionForm';
import ExecutionSelectionForm from '../filters/ExecutionSelectionForm';
import TagSelectionForm from '../filters/TagSelectionForm';

function FilterForm({ plants, processes, executions, tags }) {
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