
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
  
  return (
    <div className="h-full flex flex-col bg-secondary rounded-md overflow-hidden shadow-lg">
      <div className="px-4 py-2 font-bold bg-muted">
        {getCategoryName(category)}
      </div>
      <div className="flex-1 relative bg-prison-wall p-4">
        {/* Prison bars at the top */}
        <div className="prison-bars absolute top-0 left-0 right-0 h-10 w-full"></div>
        
        {/* Prisoners/Tasks */}
        {tasks.map((task) => (
          <PrisonerBall key={task.id} task={task} />
        ))}
        
        {/* Show message when the prison is empty */}
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400 font-bold">
            CELLULE VIDE
          </div>
        )}
      </div>
    </div>
  );
};

export default PrisonCell;
