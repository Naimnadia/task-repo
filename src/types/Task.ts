
export type TaskCategory = 'URGENT_IMPORTANT' | 'URGENT_NOT_IMPORTANT' | 'NOT_URGENT_IMPORTANT' | 'NOT_URGENT_NOT_IMPORTANT';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: Date;
}

export const getTaskColor = (category: TaskCategory): string => {
  switch (category) {
    case 'URGENT_IMPORTANT':
      return 'task-urgent_important';
    case 'URGENT_NOT_IMPORTANT':
      return 'task-urgent_not_important';
    case 'NOT_URGENT_IMPORTANT':
      return 'task-not_urgent_important';
    case 'NOT_URGENT_NOT_IMPORTANT':
      return 'task-not_urgent_not_important';
    default:
      return 'task-urgent_important';
  }
};

export const getCategoryName = (category: TaskCategory): string => {
  switch (category) {
    case 'URGENT_IMPORTANT':
      return 'Urgent et Important';
    case 'URGENT_NOT_IMPORTANT':
      return 'Urgent mais pas Important';
    case 'NOT_URGENT_IMPORTANT':
      return 'Pas Urgent mais Important';
    case 'NOT_URGENT_NOT_IMPORTANT':
      return 'Ni Urgent ni Important';
    default:
      return 'Inconnu';
  }
};

export const getEmotion = (category: TaskCategory): string => {
  switch (category) {
    case 'URGENT_IMPORTANT':
      return '😰';
    case 'URGENT_NOT_IMPORTANT':
      return '😬';
    case 'NOT_URGENT_IMPORTANT':
      return '🙂';
    case 'NOT_URGENT_NOT_IMPORTANT':
      return '😊';
    default:
      return '🤔';
  }
};
