import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TodoStats = ({ taskCounts, onClearCompleted }) => {
  const { active, completed, total } = taskCounts;

  return (
    <div className="bg-surface rounded-lg border border-border p-3 sm:p-4 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <Icon name="Circle" size={16} color="var(--color-accent)" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {active} active task{active !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {completed} completed
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="List" size={16} color="var(--color-primary)" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {total} total
            </span>
          </div>
        </div>

        {completed > 0 && (
          <Button
            variant="outline"
            size="xs"
            onClick={onClearCompleted}
            iconName="Trash2"
            iconPosition="left"
            iconSize={12}
            className="text-error border-error hover:bg-error hover:text-white text-xs sm:text-sm w-full sm:w-auto"
          >
            <span className="sm:hidden">Clear</span>
            <span className="hidden sm:inline">Clear Completed</span>
          </Button>
        )}
      </div>
      
      {total > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round((completed / total) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;