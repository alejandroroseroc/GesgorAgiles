import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Por hacer' | 'En proceso' | 'Hecho';
}

interface KanbanColumnProps {
  title: 'Por hacer' | 'En proceso' | 'Hecho';
  tasks: Task[];
  onMove: (taskIndex: number, newStatus: 'Por hacer' | 'En proceso' | 'Hecho') => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, onMove }) => {
  return (
    <div className="flex-1 bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {tasks.map((task, index) => (
        <div key={task.id} className="bg-gray-200 p-4 mb-4 rounded-md shadow-sm">
          <h4 className="font-semibold">{task.title}</h4>
          <p>{task.description}</p>
          <div className="flex justify-between mt-2">
            {title !== 'Por hacer' && (
              <button
                onClick={() => onMove(index, 'Por hacer')}
                className="bg-green-500 text-white p-1 rounded"
              >
                Mover a Por hacer
              </button>
            )}
            {title !== 'En proceso' && (
              <button
                onClick={() => onMove(index, 'En proceso')}
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Mover a En proceso
              </button>
            )}
            {title !== 'Hecho' && (
              <button
                onClick={() => onMove(index, 'Hecho')}
                className="bg-blue-500 text-white p-1 rounded"
              >
                Mover a Hecho
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanColumn;
