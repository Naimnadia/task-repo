
import React from 'react';
import { TaskCategory, getCategoryName } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import PrisonerBall from './PrisonerBall';

interface PrisonCellProps {
  category: TaskCategory;
}

const PrisonCell: React.FC<PrisonCellProps> = ({ category }) => {
  const { getTasksByCategory } = useTaskContext();
  const tasks = getTasksByCategory(category);
  
  // Define cell glow color based on category
  const getCellGlowColor = () => {
    switch(category) {
      case 'URGENT_IMPORTANT': return 'from-task-urgent_important/30 to-transparent';
      case 'URGENT_NOT_IMPORTANT': return 'from-task-urgent_not_important/30 to-transparent';
      case 'NOT_URGENT_IMPORTANT': return 'from-task-not_urgent_important/30 to-transparent';
      case 'NOT_URGENT_NOT_IMPORTANT': return 'from-task-not_urgent_not_important/30 to-transparent';
      default: return 'from-gray-500/20 to-transparent';
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-secondary rounded-xl overflow-hidden shadow-xl cell-glow border border-border">
      <div className={`px-6 py-3 font-bold bg-gradient-to-r ${getCellGlowColor()} backdrop-blur-lg`}>
        {getCategoryName(category)}
      </div>
      <div className="flex-1 relative bg-prison-wall p-6">
        {/* Prison bars at the top with improved styling */}
        <div className="prison-bars absolute top-0 left-0 right-0 h-12 w-full"></div>
        
        {/* Prisoners/Tasks */}
        {tasks.map((task) => (
          <PrisonerBall key={task.id} task={task} />
        ))}
        
        {/* Show message when the prison is empty */}
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400 font-bold text-lg italic">
            CELLULE VIDE
          </div>
        )}
      </div>
    </div>
  );
};

export default PrisonCell;
