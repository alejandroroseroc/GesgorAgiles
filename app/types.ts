export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Por hacer' | 'En proceso' | 'Hecho';
  }
  
  export interface Sprint {
    name: string;
    tasks: Task[];
  }
  