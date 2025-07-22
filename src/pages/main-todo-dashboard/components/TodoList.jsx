import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit, activeFilter }) => {
  if (todos.length === 0) {
    const getEmptyState = () => {
      switch (activeFilter) {
        case 'active':
          return {
            icon: (
              <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: 'No Active Tasks',
            description: 'All caught up! You have no active tasks at the moment.',
            suggestion: 'Create a new task to get started with your workflow.'
          };
        case 'completed':
          return {
            icon: (
              <svg className="w-16 h-16 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            ),
            title: 'No Completed Tasks Yet',
            description: 'Start completing tasks to see your progress here.',
            suggestion: 'Mark some tasks as complete to track your achievements.'
          };
        default:
          return {
            icon: (
              <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            ),
            title: 'No Tasks Created',
            description: 'Your task list is empty. Start by creating your first task.',
            suggestion: 'Add a new task above to begin organizing your workflow.'
          };
      }
    };

    const emptyState = getEmptyState();

    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            {emptyState.icon}
          </div>
          
          <h3 className="text-xl font-semibold text-slate-700">
            {emptyState.title}
          </h3>
          
          <p className="text-slate-500 max-w-md leading-relaxed">
            {emptyState.description}
          </p>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> {emptyState.suggestion}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Task count header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
        <p className="text-sm text-slate-600">
          Showing {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </p>
        
        {todos.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-500">Live updates</span>
          </div>
        )}
      </div>

      {/* Todo items */}
      <div className="space-y-3">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>

      {/* Summary footer */}
      {todos.length > 0 && (
        <div className="mt-8 pt-4 border-t border-slate-200/50">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              Active: {todos.filter(t => !t.completed).length}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              Completed: {todos.filter(t => t.completed).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;