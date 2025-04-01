
import React, { useState } from 'react';
import PrisonCell from './PrisonCell';
import AddTaskForm from './AddTaskForm';
import { Button } from '@/components/ui/button';
import { Plus, Trophy, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-brawl-stars-bg bg-brawl-pattern">
      <div className="container mx-auto p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 p-3 sm:p-4 bg-accent/60 backdrop-blur-md rounded-xl border-2 border-white/20 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-0">
            <div className="bg-yellow-500 p-1.5 sm:p-2 rounded-lg animate-pulse-glow">
              <Trophy size={isMobile ? 20 : 28} className="text-yellow-900" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent brawl-text-shadow">
              TASK BRAWL
            </h1>
            <div className="hidden sm:flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-task-urgent_important border-2 border-white/80"></div>
              <div className="w-6 h-6 rounded-full bg-task-urgent_not_important border-2 border-white/80"></div>
              <div className="w-6 h-6 rounded-full bg-task-not_urgent_important border-2 border-white/80"></div>
              <div className="w-6 h-6 rounded-full bg-task-not_urgent_not_important border-2 border-white/80"></div>
            </div>
          </div>
          <Button 
            onClick={() => setIsAddingTask(true)} 
            className="brawl-button bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-white font-bold w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus size={isMobile ? 18 : 22} strokeWidth={3} className="mr-1" /> NOUVELLE TÂCHE
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 h-[calc(100vh-160px)] md:h-[calc(100vh-180px)] overflow-y-auto md:overflow-hidden">
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
