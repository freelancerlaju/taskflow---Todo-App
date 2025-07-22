import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== todo.text) {
      onEdit(todo.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div 
      className={`group relative bg-white/80 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/30 hover:border-blue-200/60 hover:-translate-y-0.5 ${
        todo.completed 
          ? 'opacity-60 border-slate-200/40' :'border-slate-200/60 hover:bg-white/90'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority indicator line */}
      <div className={`absolute left-0 top-0 w-1 h-full rounded-l-xl transition-all duration-300 ${
        todo.completed ? 'bg-slate-300/50' : 'bg-gradient-to-b from-blue-400 to-indigo-500'
      }`} />
      
      <div className="p-6 pl-8">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            size="default"
            className="flex-shrink-0 mt-1 w-5 h-5"
          />
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={handleSave}
                  className="text-base border-2 border-blue-300 focus:border-blue-400 rounded-lg"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                    iconName="Check"
                    iconSize={14}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    iconName="X"
                    iconSize={14}
                    className="border-slate-300 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`text-lg leading-relaxed cursor-pointer select-none transition-all duration-200 ${
                      todo.completed 
                        ? 'line-through text-slate-400' :'text-slate-700 hover:text-slate-900'
                    }`}
                    onClick={handleEdit}
                  >
                    {todo.text}
                  </p>
                  
                  {/* Action buttons */}
                  <div className={`flex items-center gap-1 transition-all duration-200 ${
                    isHovered || todo.completed ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                      iconName="Edit2"
                      iconSize={16}
                      className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition-colors duration-200"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(todo.id)}
                      iconName="Trash2"
                      iconSize={16}
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-2 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Task metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(todo.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    
                    {/* Priority badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(todo?.priority || 'medium')}`}>
                      {todo?.priority || 'medium'} priority
                    </span>
                  </div>

                  {/* Completion status */}
                  {todo.completed && (
                    <div className="flex items-center gap-1 text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;