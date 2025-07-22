import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TodoInput from './components/TodoInput';
import FilterTabs from './components/FilterTabs';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';

const MainTodoDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('taskflow-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error parsing saved todos:', error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('taskflow-todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now() + Math.random(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium' // Add priority for professional categorization
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  // Toggle todo completion status
  const handleToggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Edit todo text
  const handleEditTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Clear all completed todos
  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filter todos based on active filter
  const getFilteredTodos = () => {
    switch (activeFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // Calculate task counts
  const taskCounts = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <Header />
      
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-3 tracking-tight">
              Task Management
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Streamline your workflow with our professional task management solution. 
              Stay organized, boost productivity, and achieve your goals efficiently.
            </p>
          </div>

          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Task Section */}
            <div className="lg:col-span-8 space-y-6">
              {/* Enhanced Todo Input */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/20">
                <TodoInput onAddTodo={handleAddTodo} />
              </div>

              {/* Filter Tabs */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg shadow-slate-200/10">
                <FilterTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  taskCounts={taskCounts}
                />
              </div>

              {/* Todo List */}
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200/40 shadow-lg shadow-slate-200/10 min-h-[400px]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                      {activeFilter === 'all' ? 'All Tasks' : 
                       activeFilter === 'active'? 'Active Tasks' : 'Completed Tasks'}
                    </h2>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                      {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                  <TodoList
                    todos={filteredTodos}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                    activeFilter={activeFilter}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Information */}
            <div className="lg:col-span-4 space-y-6">
              {/* Enhanced Stats */}
              {todos.length > 0 && (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/10">
                  <TodoStats
                    taskCounts={taskCounts}
                    onClearCompleted={handleClearCompleted}
                  />
                </div>
              )}

              {/* Professional Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6 shadow-lg shadow-blue-200/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800">Productivity Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Break large tasks into smaller, actionable items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Set realistic deadlines and priorities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Review and adjust your task list regularly</span>
                  </li>
                </ul>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-200/40 p-6 shadow-lg shadow-slate-200/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800">Keyboard Shortcuts</h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { key: 'Enter', action: 'Add new task' },
                    { key: 'Click', action: 'Edit task text' },
                    { key: 'Enter', action: 'Save changes' },
                    { key: 'Esc', action: 'Cancel editing' }
                  ].map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <kbd className="px-2 py-1 bg-white rounded border border-slate-200 text-xs font-medium text-slate-600">
                        {shortcut.key}
                      </kbd>
                      <span className="text-xs text-slate-600">{shortcut.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainTodoDashboard;