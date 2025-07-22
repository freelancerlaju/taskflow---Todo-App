import React from 'react';


const FilterTabs = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All Tasks', 
      count: taskCounts.total,
      icon: 'List',
      color: 'text-slate-600'
    },
    { 
      key: 'active', 
      label: 'In Progress', 
      count: taskCounts.active,
      icon: 'Circle',
      color: 'text-blue-600'
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      count: taskCounts.completed,
      icon: 'CheckCircle',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Filter Tasks</h3>
        <p className="text-sm text-slate-600">View tasks by their current status</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
              activeFilter === filter.key
                ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50'
                : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white/80'
            }`}
          >
            {/* Active indicator */}
            {activeFilter === filter.key && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
            )}
            
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                activeFilter === filter.key
                  ? 'bg-blue-100 text-blue-600' :'bg-slate-100 text-slate-500'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {filter.icon === 'List' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  )}
                  {filter.icon === 'Circle' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {filter.icon === 'CheckCircle' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              
              <div className="text-center">
                <h4 className={`font-semibold text-sm transition-colors duration-200 ${
                  activeFilter === filter.key ? 'text-slate-800' : 'text-slate-600'
                }`}>
                  {filter.label}
                </h4>
                
                <div className={`mt-1 flex items-center justify-center gap-1 ${
                  activeFilter === filter.key ? filter.color : 'text-slate-500'
                }`}>
                  <span className="text-2xl font-bold">{filter.count}</span>
                  <span className="text-xs font-medium">
                    {filter.count === 1 ? 'task' : 'tasks'}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Progress Summary */}
      {taskCounts.total > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Overall Progress</span>
            <span className="text-sm font-bold text-slate-800">
              {Math.round((taskCounts.completed / taskCounts.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(taskCounts.completed / taskCounts.total) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>{taskCounts.completed} completed</span>
            <span>{taskCounts.active} remaining</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTabs;