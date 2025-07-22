import React from 'react';
import Button from '../../../components/ui/Button';

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All', count: taskCounts.total },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-2 shadow-subtle">
      <div className="flex gap-1">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="flex-1 justify-center text-sm font-medium"
          >
            {filter.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === filter.key 
                ? 'bg-white/20 text-white' :'bg-muted text-muted-foreground'
            }`}>
              {filter.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;