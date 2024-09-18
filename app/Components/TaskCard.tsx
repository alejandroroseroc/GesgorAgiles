import { FC } from 'react';
import { Task } from '../types'; 



// Definimos las propiedades que recibe el componente TaskCard
interface TaskCardProps {
  task: Task; // La tarea que se va a mostrar
  onMove: (newStatus: 'Por hacer' | 'En proceso' | 'Hecho') => void; // Función para cambiar el estado de la tarea
}


// Componente TaskCard para representar una tarea individual
const TaskCard: FC<TaskCardProps> = ({ task, onMove }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

       {/* Sección de botones para mover la tarea entre columnas */}
      <div className="mt-2">
        {/* Muestra el botón para mover a "Por hacer" solo si la tarea no está ya en ese estado */}
        {task.status !== 'Por hacer' && (
          <button
            onClick={() => onMove('Por hacer')} //cambia el estado
            className="bg-gray-300 text-white p-2 rounded-md mr-2"
          >
            Mover a Por hacer
          </button>
        )}
        {/* Muestra el botón para mover a "En proceso" solo si la tarea no está ya en ese estado */}
        {task.status !== 'En proceso' && (
          <button
            onClick={() => onMove('En proceso')} //cambia el estado
            className="bg-yellow-500 text-white p-2 rounded-md mr-2"
          >
            Mover a En proceso
          </button>
        )}
        {/* Muestra el botón para mover a "Hecho" solo si la tarea no está ya en ese estado */}
        {task.status !== 'Hecho' && (
          <button
            onClick={() => onMove('Hecho')} //cambia el estado
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Mover a Hecho
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

