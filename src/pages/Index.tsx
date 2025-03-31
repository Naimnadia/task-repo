
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { TaskProvider } from '@/context/TaskContext';

const Index = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-background">
        <Dashboard />
      </div>
    </TaskProvider>
  );
};

export default Index;
