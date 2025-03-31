
import React, { useState } from 'react';
import { TaskCategory } from '@/types/Task';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

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
      title: "Nouveau prisonnier!",
      description: "Un nouveau prisonnier a été incarcéré.",
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none",
    });
    
    // Reset form and close
    setTitle('');
    setDescription('');
    setCategory('URGENT_IMPORTANT');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-secondary/90 backdrop-blur-md border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-foreground">Ajouter un nouveau prisonnier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-muted-foreground">Titre</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre de la tâche"
              required
              className="bg-background/60 border-border"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-muted-foreground">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrez la description de la tâche"
              rows={3}
              className="bg-background/60 border-border"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1 text-muted-foreground">Catégorie</label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as TaskCategory)}
            >
              <SelectTrigger className="bg-background/60 border-border">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-secondary border-border">
                <SelectItem value="URGENT_IMPORTANT">Urgent et Important</SelectItem>
                <SelectItem value="URGENT_NOT_IMPORTANT">Urgent mais pas Important</SelectItem>
                <SelectItem value="NOT_URGENT_IMPORTANT">Pas Urgent mais Important</SelectItem>
                <SelectItem value="NOT_URGENT_NOT_IMPORTANT">Ni Urgent ni Important</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 transition-all">
              Incarcérer le prisonnier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
