
import React, { useState } from 'react';
import { Task } from '../types';
import { useTasks } from '../context/TaskContext';
import { Button } from './Button';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTask(task.id, { title: editTitle });
    }
    setIsEditing(false);
  };

  return (
    <div className={`group bg-white p-5 rounded-xl border transition-all duration-200 hover:shadow-md ${
      task.completed ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-200'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleTask(task.id)}
            className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.completed 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : 'border-slate-300 hover:border-indigo-500'
            }`}
          >
            {task.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  autoFocus
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleUpdate}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                  className="w-full px-2 py-1 text-sm border-b border-indigo-500 focus:outline-none bg-transparent"
                />
              </div>
            ) : (
              <div>
                <h3 className={`font-medium truncate ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => deleteTask(task.id)}
            className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
