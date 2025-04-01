
import React, { useState } from 'react';
import { TaskCategory } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Sword, Shield, Zap, Bomb } from 'lucide-react';

interface AddTaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('URGENT_IMPORTANT');
  const { addTask } = useTaskContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un titre pour la tâche",
        variant: "destructive",
      });
      return;
    }
    
    addTask(title, description, category);
    
    toast({
      title: "Nouveau combattant!",
      description: "Un nouveau brawler a rejoint l'arène.",
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none font-bold",
    });
    
    // Reset form and close
    setTitle('');
    setDescription('');
    setCategory('URGENT_IMPORTANT');
    onOpenChange(false);
  };

  const getCategoryIcon = (cat: TaskCategory) => {
    switch(cat) {
      case 'URGENT_IMPORTANT': return <Bomb className="h-4 w-4 text-task-urgent_important" />;
      case 'URGENT_NOT_IMPORTANT': return <Zap className="h-4 w-4 text-task-urgent_not_important" />;
      case 'NOT_URGENT_IMPORTANT': return <Shield className="h-4 w-4 text-task-not_urgent_important" />;
      case 'NOT_URGENT_NOT_IMPORTANT': return <Sword className="h-4 w-4 text-task-not_urgent_not_important" />;
      default: return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur-md border-2 border-white/20 shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-primary-foreground text-center mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent brawl-text-shadow">
              NOUVEAU BRAWLER
            </span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-bold mb-1 text-white">Nom du Brawler</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le nom de la tâche"
              required
              className="bg-background/60 border-white/20 focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-bold mb-1 text-white">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez la description de la tâche"
              rows={3}
              className="bg-background/60 border-white/20 focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-bold mb-1 text-white">Arène</label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as TaskCategory)}
            >
              <SelectTrigger className="bg-background/60 border-white/20">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/20">
                <SelectItem value="URGENT_IMPORTANT" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Bomb className="h-4 w-4 text-task-urgent_important" /> 
                    <span>Urgent et Important</span>
                  </div>
                </SelectItem>
                <SelectItem value="URGENT_NOT_IMPORTANT">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-task-urgent_not_important" /> 
                    <span>Urgent mais pas Important</span>
                  </div>
                </SelectItem>
                <SelectItem value="NOT_URGENT_IMPORTANT">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-task-not_urgent_important" /> 
                    <span>Pas Urgent mais Important</span>
                  </div>
                </SelectItem>
                <SelectItem value="NOT_URGENT_NOT_IMPORTANT">
                  <div className="flex items-center gap-2">
                    <Sword className="h-4 w-4 text-task-not_urgent_not_important" /> 
                    <span>Ni Urgent ni Important</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="brawl-button bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 w-full font-black text-lg py-6 animate-pulse-glow"
            >
              DÉPLOYER LE BRAWLER
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
