
import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useTaskForm } from '../hooks/useTaskForm';
import { Button } from './Button';

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const { values, errors, isSubmitting, setIsSubmitting, handleChange, validate, setErrors, resetForm } = useTaskForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addTask({
        title: values.title,
        description: values.description,
        completed: false
      });
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="e.g., Update project documentation"
            className={`w-full px-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${
              errors.title ? 'border-rose-500' : 'border-slate-200'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={3}
            placeholder="Add some details about this task..."
            className={`w-full px-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${
              errors.description ? 'border-rose-500' : 'border-slate-200'
            }`}
          />
          {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create Task
        </Button>
      </div>
    </form>
  );
};
