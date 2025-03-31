
import React, { useState } from 'react';
import { Task, getTaskColor, getEmotion } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

interface PrisonerBallProps {
  task: Task;
}

const PrisonerBall: React.FC<PrisonerBallProps> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEscaping, setIsEscaping] = useState(false);
  const { completeTask } = useTaskContext();
  
  const getBallColor = () => {
    switch(task.category) {
      case 'URGENT_IMPORTANT': return 'bg-task-urgent_important';
      case 'URGENT_NOT_IMPORTANT': return 'bg-task-urgent_not_important';
      case 'NOT_URGENT_IMPORTANT': return 'bg-task-not_urgent_important';
      case 'NOT_URGENT_NOT_IMPORTANT': return 'bg-task-not_urgent_not_important';
      default: return 'bg-gray-500';
    }
  };
  
  const emotion = getEmotion(task.category);
  
  // Random position within the cell
  const randomX = Math.floor(Math.random() * 70) + 10; // 10-80% of the width
  const randomY = Math.floor(Math.random() * 70) + 15; // 15-85% of the height
  
  // Random animation delay for the bounce
  const randomDelay = Math.random() * 2;
  const randomDuration = (Math.random() * 0.5) + 0.8; // 0.8-1.3s
  
  const handleComplete = () => {
    setIsEscaping(true);
    setIsOpen(false);
    
    // Trigger confetti with more colorful options
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF5A5F', '#45C4B0', '#FFC145', '#8D6FD1', '#5D9CEC']
    });
    
    toast({
      title: "Tâche accomplie!",
      description: "Un prisonnier s'est échappé!",
      className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none",
    });
    
    // Give time for the animation to play
    setTimeout(() => {
      completeTask(task.id);
    }, 1000);
  };
  
  return (
    <>
      <div
        className={`prison-ball ${getBallColor()} absolute rounded-full w-14 h-14 flex items-center justify-center text-2xl cursor-pointer shadow-lg`}
        style={{
          left: `${randomX}%`,
          top: `${randomY}%`,
          animationDuration: `${randomDuration}s`,
          animationDelay: `${randomDelay}s`,
          animationName: isEscaping ? 'escape' : 'float'
        }}
        onClick={() => setIsOpen(true)}
      >
        {emotion}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-secondary/90 backdrop-blur-md border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary-foreground">{task.title}</DialogTitle>
            <DialogDescription className="pt-2 text-muted-foreground">
              {task.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="hover:bg-accent hover:text-accent-foreground">
              Fermer
            </Button>
            <Button onClick={handleComplete} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              Marquer comme accompli
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrisonerBall;
