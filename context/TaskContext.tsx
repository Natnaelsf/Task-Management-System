
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, TaskContextType } from '../types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      // Add mock descriptions since JSONPlaceholder doesn't provide them
      const enrichedTasks = data.map((t: any) => ({
        ...t,
        description: `This is a detailed description for task ${t.id}. Manage your time effectively!`
      }));
      setTasks(enrichedTasks);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      refreshTasks: fetchTasks
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
