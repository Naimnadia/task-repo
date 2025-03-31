
import React, { useState } from 'react';
import PrisonCell from './PrisonCell';
import AddTaskForm from './AddTaskForm';
import { Button } from '@/components/ui/button';
import { Plus, Moon, Sun } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8 p-4 bg-secondary/40 backdrop-blur-md rounded-lg border border-border">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">TaskPrison</h1>
          <Button onClick={() => setIsAddingTask(true)} className="transition-all hover:scale-105 hover:shadow-md hover:shadow-primary/20">
            <Plus size={18} className="mr-1" /> Nouvelle Tâche
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-180px)]">
          <PrisonCell category="URGENT_IMPORTANT" />
          <PrisonCell category="URGENT_NOT_IMPORTANT" />
          <PrisonCell category="NOT_URGENT_IMPORTANT" />
          <PrisonCell category="NOT_URGENT_NOT_IMPORTANT" />
        </div>
        
        <AddTaskForm open={isAddingTask} onOpenChange={setIsAddingTask} />
      </div>
    </div>
  );
};

export default Dashboard;
