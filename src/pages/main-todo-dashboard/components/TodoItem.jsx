import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

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

  return (
    <div className={`group bg-surface rounded-lg border border-border p-4 shadow-subtle transition-all duration-200 hover:shadow-elevated ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          size="default"
          className="flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleSave}
                className="flex-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                iconName="Check"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                iconName="X"
                iconSize={16}
              />
            </div>
          ) : (
            <p
              className={`text-base cursor-pointer select-none ${
                todo.completed 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}
              onClick={handleEdit}
            >
              {todo.text}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEdit}
                iconName="Edit2"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                iconName="Trash2"
                iconSize={16}
                className="text-muted-foreground hover:text-error"
              />
            </>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Created: {new Date(todo.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
};

export default TodoItem;