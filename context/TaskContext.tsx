
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, TaskContextType } from '../types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with an empty task list. Removed automatic fetching of sample/test tasks
  // so the application does not include any pre-filled test data.
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      if (!response.ok) throw new Error('Failed to create task');
      const newTask = await response.json();
      // Use local ID for newly added items to avoid duplicates if API always returns 201
      const localNewTask = { ...newTask, id: Date.now(), description: task.description || 'No description provided' };
      setTasks(prev => [localNewTask, ...prev]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    try {
      // In a real app, we'd hit the API. Here we update local state immediately.
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
  // refreshTasks is a no-op by default; you can implement a data source
  // and call setTasks(...) from your own code if needed.
  refreshTasks: async () => {}
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
