
import React, { useState } from 'react';
import { Task, getTaskColor, getEmotion } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Trophy, Check } from 'lucide-react';

// Import confetti separately
let confetti: any;
import('canvas-confetti').then(module => {
  confetti = module.default;
});

interface PrisonerBallProps {
  task: Task;
}

const PrisonerBall: React.FC<PrisonerBallProps> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEscaping, setIsEscaping] = useState(false);
  const { completeTask } = useTaskContext();
  
  const getBallColor = () => {
    switch(task.category) {
      case 'URGENT_IMPORTANT': return 'from-red-500 to-red-700';
      case 'URGENT_NOT_IMPORTANT': return 'from-green-500 to-green-700';
      case 'NOT_URGENT_IMPORTANT': return 'from-yellow-400 to-yellow-600';
      case 'NOT_URGENT_NOT_IMPORTANT': return 'from-purple-500 to-purple-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };
  
  const getBallBorder = () => {
    switch(task.category) {
      case 'URGENT_IMPORTANT': return 'border-red-300';
      case 'URGENT_NOT_IMPORTANT': return 'border-green-300';
      case 'NOT_URGENT_IMPORTANT': return 'border-yellow-300';
      case 'NOT_URGENT_NOT_IMPORTANT': return 'border-purple-300';
      default: return 'border-gray-300';
    }
  };
  
  const emotion = getEmotion(task.category);
  
  // Random position within the cell
  const randomX = Math.floor(Math.random() * 70) + 10; // 10-80% of the width
  const randomY = Math.floor(Math.random() * 70) + 15; // 15-85% of the height
  
  const handleComplete = () => {
    setIsEscaping(true);
    setIsOpen(false);
    
    // Trigger confetti with more colorful options
    if (confetti) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F54748', '#38B000', '#FFBE0B', '#8338EC', '#5D9CEC'],
        shapes: ['star', 'square', 'circle'],
      });
    }
    
    toast({
      title: "Victoire!",
      description: "Tâche accomplie avec succès!",
      className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none font-bold",
    });
    
    // Give time for the animation to play
    setTimeout(() => {
      completeTask(task.id);
    }, 1000);
  };
  
  return (
    <>
      <div
        className={`prison-ball bg-gradient-to-b ${getBallColor()} absolute rounded-full w-16 h-16 flex items-center justify-center text-3xl border-2 ${getBallBorder()} shadow-lg z-10`}
        style={{
          left: `${randomX}%`,
          top: `${randomY}%`,
          animationName: isEscaping ? 'escape' : 'float'
        }}
        onClick={() => setIsOpen(true)}
      >
        {emotion}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card/95 backdrop-blur-md border-2 border-white/20 shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" /> {task.title}
            </DialogTitle>
            <DialogDescription className="pt-2 text-muted-foreground">
              {task.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="hover:bg-accent hover:text-accent-foreground">
              Fermer
            </Button>
            <Button 
              onClick={handleComplete} 
              className="brawl-button bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 gap-2"
            >
              <Check size={18} strokeWidth={3} /> Victoire!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrisonerBall;
