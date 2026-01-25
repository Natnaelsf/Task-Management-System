
export interface Task {
  userId?: number;
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  refreshTasks: () => void;
};
