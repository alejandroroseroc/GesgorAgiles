"use client";
import { useState } from 'react';
import KanbanColumn from './Components/KanbanColumn';
import SprintForm from './Components/SprintForm';
import { Task, Sprint } from './types';
// Componente principal HomePage
const HomePage = () => {

  // Definimos los estados locales para el título y descripción de la tarea, nombre del sprint, y la lista de sprints
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [sprintName, setSprintName] = useState('');
  const [sprints, setSprints] = useState<Sprint[]>([]);
  
  // Función para agregar un nuevo sprint
  const addSprint = () => {
    if (sprintName) { // Solo agrega si hay un nombre para el sprint
      setSprints([...sprints, { name: sprintName, tasks: [] }]);// Añadimos un nuevo sprint con un array vacío de tareas
      setSprintName('');// Limpiamos el campo del sprint
    }
  };

  // Función para agregar una nueva tarea a un sprint específico
  const addTask = (sprintIndex: number) => {
    if (taskTitle) {// Solo agrega si hay un título para la tarea
      const newSprints = [...sprints]; // Clonamos el array de sprints
      newSprints[sprintIndex].tasks.push({
        id: Date.now(),// Generamos un id único basado en la fecha actual
        title: taskTitle,// Usamos el título de la tarea del estado
        description: taskDescription,// Usamos la descripción de la tarea del estado
        status: 'Por hacer'// Estado inicial de la tarea es 'Por hacer'
      });
      setSprints(newSprints);
      setTaskTitle('');
      setTaskDescription('');
    }
  };


  // Función para cambiar el estado de una tarea
  const changeTaskStatus = (sprintIndex: number, taskIndex: number, status: 'Por hacer' | 'En proceso' | 'Hecho') => {
    const newSprints = [...sprints]; // Clonamos el array de sprints
    const task = newSprints[sprintIndex].tasks[taskIndex];// Obtenemos la tarea específica
    if (task) {// Si la tarea existe, actualizamos su estado
      task.status = status;
      setSprints(newSprints); // Actualizamos el estado de los sprints
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5"> {/* Estilos del contenedor principal */}
      <h1 className="text-3xl font-bold text-center mb-10">Gestor de Proyectos Ágiles</h1> {/* Título principal */}

      <SprintForm sprintName={sprintName} setSprintName={setSprintName} addSprint={addSprint} />{/* Formulario para agregar sprints */}

      {sprints.map((sprint, sprintIndex) => (
        <div key={sprintIndex} className="mb-10"> {/* Contenedor de cada sprint */}
          <h2 className="text-2xl font-semibold text-center mb-5">{sprint.name}</h2>{/* Nombre del sprint */}

          <div className="w-full max-w-md mx-auto mb-5">{/* Formulario para agregar tareas */}
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)} // Actualizamos el título de la tarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Nombre de la tarea..."
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)} // Actualizamos la descripción de la tarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Descripción de la tarea..."
            />
            <button
              onClick={() => addTask(sprintIndex)}// Llamamos a la función para agregar la tarea
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Agregar Tarea
            </button>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">  {/* Contenedor de las columnas Kanban */}
            <KanbanColumn
              title="Por hacer"
              tasks={sprint.tasks.filter(task => task.status === 'Por hacer')}// Filtramos las tareas que están en 'Por hacer'
              onMove={(taskIndex, newStatus) => changeTaskStatus(sprintIndex, taskIndex, newStatus)}// Función para mover tareas entre columnas
            />

            <KanbanColumn
              title="En proceso"
              tasks={sprint.tasks.filter(task => task.status === 'En proceso')}// Filtramos las tareas que están 'En proceso'
              onMove={(taskIndex, newStatus) => changeTaskStatus(sprintIndex, taskIndex, newStatus)}// Función para mover tareas
            />

            <KanbanColumn
              title="Hecho"
              tasks={sprint.tasks.filter(task => task.status === 'Hecho')} // Filtramos las tareas que están 'Hecho'
              onMove={(taskIndex, newStatus) => changeTaskStatus(sprintIndex, taskIndex, newStatus)}// Función para mover tareas
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

