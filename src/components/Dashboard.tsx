
import React, { useState } from 'react';
import PrisonCell from './PrisonCell';
import AddTaskForm from './AddTaskForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TaskPrison</h1>
        <Button onClick={() => setIsAddingTask(true)}>
          <Plus size={16} className="mr-1" /> Nouvelle Tâche
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-150px)]">
        <PrisonCell category="URGENT_IMPORTANT" />
        <PrisonCell category="URGENT_NOT_IMPORTANT" />
        <PrisonCell category="NOT_URGENT_IMPORTANT" />
        <PrisonCell category="NOT_URGENT_NOT_IMPORTANT" />
      </div>
      
      <AddTaskForm open={isAddingTask} onOpenChange={setIsAddingTask} />
    </div>
  );
};

export default Dashboard;
