import React from 'react';

interface SprintFormProps {
  sprintName: string;
  setSprintName: React.Dispatch<React.SetStateAction<string>>;
  addSprint: () => void;
}

const SprintForm: React.FC<SprintFormProps> = ({ sprintName, setSprintName, addSprint }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-5">
      <input
        type="text"
        value={sprintName}
        onChange={(e) => setSprintName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Nombre del sprint..."
      />
      <button
        onClick={addSprint}
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Agregar Sprint
      </button>
    </div>
  );
};

export default SprintForm;
