
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task, TaskCategory } from '@/types/Task';

// Generate a simple UUID function since we're having issues with the uuid import
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string, category: TaskCategory) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTasksByCategory: (category: TaskCategory) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: generateUUID(),
      title: 'Payer les factures',
      description: 'Payer les factures d\'électricité et d\'internet avant la date limite.',
      category: 'URGENT_IMPORTANT',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: generateUUID(),
      title: 'Répondre aux emails',
      description: 'Répondre aux emails non urgents reçus cette semaine.',
      category: 'URGENT_NOT_IMPORTANT',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: generateUUID(),
      title: 'Planifier les vacances',
      description: 'Rechercher des destinations et planifier les vacances d\'été.',
      category: 'NOT_URGENT_IMPORTANT',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: generateUUID(),
      title: 'Regarder un film',
      description: 'Regarder le nouveau film recommandé par des amis.',
      category: 'NOT_URGENT_NOT_IMPORTANT',
      completed: false,
      createdAt: new Date(),
    },
  ]);

  const addTask = (title: string, description: string, category: TaskCategory) => {
    const newTask: Task = {
      id: generateUUID(),
      title,
      description,
      category,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: true } : task
    ));

    // Remove the completed task after animation completes
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
    }, 1200);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter(task => task.category === category && !task.completed);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask, deleteTask, getTasksByCategory }}>
      {children}
    </TaskContext.Provider>
  );
};
