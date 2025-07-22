import React from 'react';
import TodoItem from './TodoItem';
import Icon from '../../../components/AppIcon';

const TodoList = ({ todos, onToggle, onDelete, onEdit, activeFilter }) => {
  if (todos.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-12 text-center shadow-subtle">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="CheckSquare" size={32} color="var(--color-muted-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {activeFilter === 'completed' ? 'No completed tasks' : 
               activeFilter === 'active' ? 'No active tasks' : 'No tasks yet'}
            </h3>
            <p className="text-muted-foreground">
              {activeFilter === 'completed' ? 'Complete some tasks to see them here.' :
               activeFilter === 'active' ? 'All your tasks are completed!' :
               'Add your first task to get started.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;