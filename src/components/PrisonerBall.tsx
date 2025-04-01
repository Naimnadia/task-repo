
import React, { useState } from 'react';
import { Task, getTaskColor, getEmotion } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Trophy, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
  
  // Create unique positioning for each prisoner
  const hash = task.id.split('-')[0] || '';
  const hashSum = [...hash].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Adjust positioning ranges based on mobile or desktop
  const randomX = isMobile 
    ? 10 + (hashSum % 80) // Between 10% and 90% on mobile (wider range)
    : 20 + (hashSum % 60); // Between 20% and 80% on desktop
  
  const randomY = isMobile
    ? 15 + ((hashSum * 7) % 70) // Between 15% and 85% on mobile (wider vertical range)
    : 20 + ((hashSum * 7) % 60); // Between 20% and 80% on desktop
  
  const handleComplete = () => {
    setIsEscaping(true);
    setIsOpen(false);
    
    // Trigger confetti with more colorful options
    if (confetti) {
      confetti({
        particleCount: isMobile ? 100 : 200,
        spread: 80,
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
  
  // Size of ball reduced by 30%
  const ballSize = isMobile ? 'w-8 h-8' : 'w-11 h-11'; // Reduced from w-12/h-12 and w-16/h-16
  const textSize = isMobile ? 'text-xl' : 'text-2xl'; // Reduced from text-2xl and text-3xl
  
  return (
    <>
      <div
        className={`prison-ball bg-gradient-to-b ${getBallColor()} rounded-full ${ballSize} flex items-center justify-center ${textSize} border-2 ${getBallBorder()} shadow-lg cursor-pointer`}
        style={{
          position: 'absolute',
          left: `${randomX}%`,
          top: `${randomY}%`,
          zIndex: 50,
          animationName: isEscaping ? 'escape' : 'float',
          animationDuration: `${2 + (hashSum % 2)}s`
        }}
        onClick={() => setIsOpen(true)}
      >
        {emotion}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card/95 backdrop-blur-md border-2 border-white/20 shadow-xl rounded-xl max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold text-primary-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" /> {task.title}
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm sm:text-base text-muted-foreground">
              {task.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full sm:w-auto hover:bg-accent hover:text-accent-foreground">
              Fermer
            </Button>
            <Button 
              onClick={handleComplete} 
              className="w-full sm:w-auto brawl-button bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 gap-2"
            >
              <Check size={16} strokeWidth={3} /> Victoire!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrisonerBall;
