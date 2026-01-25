
import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const { tasks, loading, error } = useTasks();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active': return tasks.filter(t => !t.completed);
      case 'completed': return tasks.filter(t => t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  if (loading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading your workflow...</p>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Your Tasks</h2>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${
                filter === f 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-slate-500">No tasks found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
