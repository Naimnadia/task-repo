
import React from 'react';
import { TaskCategory, getCategoryName } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import PrisonerBall from './PrisonerBall';
import { Star } from 'lucide-react';

interface PrisonCellProps {
  category: TaskCategory;
}

const PrisonCell: React.FC<PrisonCellProps> = ({ category }) => {
  const { getTasksByCategory } = useTaskContext();
  const tasks = getTasksByCategory(category);
  
  // Define cell glow and styles based on category
  const getCellStyles = () => {
    switch(category) {
      case 'URGENT_IMPORTANT': 
        return {
          gradient: 'from-task-urgent_important/50 to-task-urgent_important/10',
          border: 'border-task-urgent_important/50',
          textColor: 'text-task-urgent_important'
        };
      case 'URGENT_NOT_IMPORTANT': 
        return {
          gradient: 'from-task-urgent_not_important/50 to-task-urgent_not_important/10',
          border: 'border-task-urgent_not_important/50',
          textColor: 'text-task-urgent_not_important'
        };
      case 'NOT_URGENT_IMPORTANT': 
        return {
          gradient: 'from-task-not_urgent_important/50 to-task-not_urgent_important/10',
          border: 'border-task-not_urgent_important/50',
          textColor: 'text-task-not_urgent_important'
        };
      case 'NOT_URGENT_NOT_IMPORTANT': 
        return {
          gradient: 'from-task-not_urgent_not_important/50 to-task-not_urgent_not_important/10',
          border: 'border-task-not_urgent_not_important/50',
          textColor: 'text-task-not_urgent_not_important'
        };
      default: 
        return {
          gradient: 'from-gray-500/20 to-transparent',
          border: 'border-gray-500/50',
          textColor: 'text-gray-500'
        };
    }
  };
  
  const styles = getCellStyles();
  
  return (
    <div className={`h-full flex flex-col bg-card/80 rounded-xl overflow-hidden shadow-2xl cell-glow brawl-box ${styles.border}`}>
      <div className={`px-6 py-4 font-extrabold text-xl bg-gradient-to-r ${styles.gradient} backdrop-blur-lg flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Star size={20} className={`${styles.textColor} fill-current`} />
          <span className="brawl-text-shadow uppercase">{getCategoryName(category)}</span>
        </div>
        <div className={`${styles.textColor} font-black text-xl`}>
          {tasks.length}
        </div>
      </div>
      
      <div className="flex-1 relative bg-prison-wall overflow-hidden p-4">
        {/* Prison bars at the top */}
        <div className="prison-bars absolute top-0 left-0 right-0 h-12 w-full"></div>
        
        {/* Container for prisoners */}
        <div className="relative h-full w-full" style={{ minHeight: "200px" }}>
          {/* Render tasks/prisoners */}
          {tasks.map((task) => (
            <PrisonerBall key={task.id} task={task} />
          ))}
          
          {/* Show message when the prison is empty */}
          {tasks.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-gray-400 font-bold text-lg italic p-4 bg-black/30 rounded-lg backdrop-blur-sm border border-white/10">
                ARÈNE VIDE
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrisonCell;
