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
      createdAt: new Date().toISOString()
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Tasks
            </h1>
            <p className="text-muted-foreground">
              Stay organized and productive with your personal task manager
            </p>
          </div>

          {/* Todo Input */}
          <div className="mb-6">
            <TodoInput onAddTodo={handleAddTodo} />
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </div>

          {/* Todo List */}
          <div className="mb-6">
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              activeFilter={activeFilter}
            />
          </div>

          {/* Todo Stats */}
          {todos.length > 0 && (
            <div className="mb-6">
              <TodoStats
                taskCounts={taskCounts}
                onClearCompleted={handleClearCompleted}
              />
            </div>
          )}

          {/* Keyboard Shortcuts Info */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-2">
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>• Enter: Add new task</div>
              <div>• Click text: Edit task</div>
              <div>• Enter: Save changes</div>
              <div>• Escape: Cancel editing</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainTodoDashboard;