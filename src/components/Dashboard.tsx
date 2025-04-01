
import React, { useState } from 'react';
import PrisonCell from './PrisonCell';
import AddTaskForm from './AddTaskForm';
import { Button } from '@/components/ui/button';
import { Plus, Trophy, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  return (
    <div className="min-h-screen bg-brawl-stars-bg bg-brawl-pattern">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8 p-4 bg-accent/60 backdrop-blur-md rounded-xl border-2 border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-lg animate-pulse-glow">
              <Trophy size={28} className="text-yellow-900" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent brawl-text-shadow">
              TASK BRAWL
            </h1>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-task-urgent_important border-2 border-white/80"></div>
              <div className="w-6 h-6 rounded-full bg-task-urgent_not_important border-2 border-white/80"></div>
              <div className="w-6 h-6 rounded-full bg-task-not_urgent_important border-2 border-white/80"></div>
              <div className="w-6 h-6 rounded-full bg-task-not_urgent_not_important border-2 border-white/80"></div>
            </div>
          </div>
          <Button 
            onClick={() => setIsAddingTask(true)} 
            className="brawl-button bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 rounded-xl px-6 py-3 text-white font-bold"
          >
            <Plus size={22} strokeWidth={3} className="mr-1" /> NOUVELLE TÂCHE
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
