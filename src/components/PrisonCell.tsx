
import React, { useState } from 'react';
import { TaskCategory, getCategoryName } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import PrisonerBall from './PrisonerBall';
import { Star, Battery } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';

interface PrisonCellProps {
  category: TaskCategory;
}

const PrisonCell: React.FC<PrisonCellProps> = ({ category }) => {
  const { getTasksByCategory } = useTaskContext();
  const tasks = getTasksByCategory(category);
  const isMobile = useIsMobile();
  const [showTasks, setShowTasks] = useState(false);
  
  // Define cell glow and styles based on category
  const getCellStyles = () => {
    switch(category) {
      case 'URGENT_IMPORTANT': 
        return {
          gradient: 'from-task-urgent_important/50 to-task-urgent_important/10',
          border: 'border-task-urgent_important/50',
          textColor: 'text-task-urgent_important',
          batteryFill: 'bg-task-urgent_important'
        };
      case 'URGENT_NOT_IMPORTANT': 
        return {
          gradient: 'from-task-urgent_not_important/50 to-task-urgent_not_important/10',
          border: 'border-task-urgent_not_important/50',
          textColor: 'text-task-urgent_not_important',
          batteryFill: 'bg-task-urgent_not_important'
        };
      case 'NOT_URGENT_IMPORTANT': 
        return {
          gradient: 'from-task-not_urgent_important/50 to-task-not_urgent_important/10',
          border: 'border-task-not_urgent_important/50',
          textColor: 'text-task-not_urgent_important',
          batteryFill: 'bg-task-not_urgent_important'
        };
      case 'NOT_URGENT_NOT_IMPORTANT': 
        return {
          gradient: 'from-task-not_urgent_not_important/50 to-task-not_urgent_not_important/10',
          border: 'border-task-not_urgent_not_important/50',
          textColor: 'text-task-not_urgent_not_important',
          batteryFill: 'bg-task-not_urgent_not_important'
        };
      default: 
        return {
          gradient: 'from-gray-500/20 to-transparent',
          border: 'border-gray-500/50',
          textColor: 'text-gray-500',
          batteryFill: 'bg-gray-500'
        };
    }
  };
  
  const styles = getCellStyles();
  
  // Calculate battery level based on number of tasks
  const batteryLevel = tasks.length > 0 ? Math.min(tasks.length * 10, 100) : 0;
  
  const toggleShowTasks = () => {
    setShowTasks(!showTasks);
  };
  
  return (
    <div className={`h-full flex flex-col bg-card/80 rounded-xl overflow-hidden shadow-2xl cell-glow brawl-box ${styles.border}`}>
      <div className={`px-3 sm:px-6 py-3 sm:py-4 font-extrabold text-lg sm:text-xl bg-gradient-to-r ${styles.gradient} backdrop-blur-lg flex items-center justify-between`}>
        <div className="flex items-center gap-1 sm:gap-2">
          <Star size={isMobile ? 16 : 20} className={`${styles.textColor} fill-current`} />
          <span className="brawl-text-shadow uppercase">{getCategoryName(category)}</span>
        </div>
        <div className={`${styles.textColor} font-black text-lg sm:text-xl`}>
          {tasks.length}
        </div>
      </div>
      
      <div className="flex-1 relative bg-prison-wall overflow-hidden p-2 sm:p-4 flex items-center">
        {/* Battery container */}
        <div className="w-full flex flex-col gap-3">
          {/* Horizontal battery */}
          <div className="w-full bg-black/40 rounded-md h-8 sm:h-12 p-1 sm:p-2 backdrop-blur-sm border border-white/10 flex items-center">
            <div 
              className={`h-full ${styles.batteryFill} rounded transition-all duration-1000 ease-out relative`} 
              style={{ 
                width: `${batteryLevel}%`,
                boxShadow: `0 0 10px 2px ${styles.batteryFill === 'bg-task-urgent_important' ? '#F54748' : 
                  styles.batteryFill === 'bg-task-urgent_not_important' ? '#38B000' : 
                  styles.batteryFill === 'bg-task-not_urgent_important' ? '#FFBE0B' : '#8338EC'}`
              }}
            >
              {batteryLevel > 0 && (
                <div className="absolute inset-0 battery-animation"></div>
              )}
            </div>
            
            {/* Vertical bars representing tasks */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-around pointer-events-none">
              {tasks.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-full w-1 sm:w-1.5 ${styles.batteryFill} opacity-80 cursor-pointer`}
                  style={{
                    height: '140%', 
                    marginLeft: index * (100 / Math.max(tasks.length, 1)) + '%',
                    transform: 'translateY(-20%)'
                  }}
                  onClick={() => toggleShowTasks()}
                />
              ))}
            </div>
          </div>
          
          {/* Task display button */}
          <button 
            onClick={toggleShowTasks} 
            className="w-full py-1 sm:py-2 px-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded border border-white/10 text-sm sm:text-base font-bold transition-all"
          >
            {showTasks ? "CACHER TÂCHES" : "AFFICHER TÂCHES"}
          </button>
          
          {/* Container for task display */}
          {showTasks && (
            <div className="relative mt-2 border border-white/10 rounded-md bg-black/20 backdrop-blur-sm p-2 transition-all animate-fade-in">
              {/* Render tasks/prisoners */}
              <div className="flex flex-wrap gap-2 justify-center">
                {tasks.map((task) => (
                  <PrisonerBall key={task.id} task={task} />
                ))}
              </div>
              
              {/* Show message when no tasks */}
              {tasks.length === 0 && (
                <div className="text-gray-400 font-bold text-sm sm:text-base italic p-3 text-center">
                  AUCUNE TÂCHE
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrisonCell;
