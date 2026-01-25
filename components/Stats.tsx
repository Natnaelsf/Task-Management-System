
import React from 'react';
import { useTasks } from '../context/TaskContext';

export const Stats: React.FC = () => {
  const { tasks } = useTasks();
  
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tasks</p>
        <p className="text-2xl font-bold text-slate-800">{total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</p>
        <p className="text-2xl font-bold text-emerald-600">{completed}</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</p>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold text-indigo-600">{progress}%</p>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
