
import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Stats } from './components/Stats';

const App: React.FC = () => {
  return (
    <TaskProvider>
  <div className="min-h-screen bg-slate-50 pb-20">
        {/* Navigation / Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">TASK <span className="text-indigo-600">MANAGER</span></h1>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm text-slate-500 font-medium">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300"></div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Fixed on desktop */}
            <div className="md:col-span-1 lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-24">
                <Stats />
                <TaskForm />
                {/* Productivity tip removed from UI per request */}
              </div>
            </div>

            {/* Right Main Content */}
            <div className="lg:col-span-8">
              <TaskList />
            </div>
          </div>
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
