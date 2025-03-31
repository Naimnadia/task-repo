
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
  
  const colorClass = getTaskColor(task.category);
  const emotion = getEmotion(task.category);
  
  // Random position within the cell
  const randomX = Math.floor(Math.random() * 70) + 10; // 10-80% of the width
  const randomY = Math.floor(Math.random() * 70) + 10; // 10-80% of the height
  
  // Random animation delay for the bounce
  const randomDelay = Math.random() * 2;
  
  const handleComplete = () => {
    setIsEscaping(true);
    setIsOpen(false);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast({
      title: "Tâche accomplie!",
      description: "Un prisonnier s'est échappé!",
    });
    
    // Give time for the animation to play
    setTimeout(() => {
      completeTask(task.id);
    }, 1000);
  };
  
  return (
    <>
      <div
        className={`prison-ball bg-${colorClass} absolute rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer animate-bounce`}
        style={{
          left: `${randomX}%`,
          top: `${randomY}%`,
          animationDuration: '1s',
          animationDelay: `${randomDelay}s`,
          animationName: isEscaping ? 'escape' : 'bounce'
        }}
        onClick={() => setIsOpen(true)}
      >
        {emotion}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription className="pt-2">
              {task.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Fermer
            </Button>
            <Button onClick={handleComplete}>
              Marquer comme accompli
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrisonerBall;
