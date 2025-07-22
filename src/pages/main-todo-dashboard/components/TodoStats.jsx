import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TodoStats = ({ taskCounts, onClearCompleted }) => {
  const { active, completed, total } = taskCounts;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Get productivity message based on completion rate
  const getProductivityMessage = () => {
    if (completionRate >= 80) return { message: 'Excellent productivity!', color: 'text-green-600', bg: 'bg-green-50' };
    if (completionRate >= 60) return { message: 'Great progress!', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (completionRate >= 40) return { message: 'Good momentum!', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (completionRate > 0) return { message: 'Getting started!', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { message: 'Ready to begin!', color: 'text-slate-600', bg: 'bg-slate-50' };
  };

  const productivity = getProductivityMessage();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Task Analytics</h3>
          <p className="text-sm text-slate-600">Your productivity insights</p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Active Tasks */}
        <div className="bg-blue-50/80 border border-blue-200/50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Circle" size={16} color="#2563eb" />
          </div>
          <div className="text-2xl font-bold text-blue-700">{active}</div>
          <div className="text-xs text-blue-600 font-medium">Active</div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-green-50/80 border border-green-200/50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="CheckCircle" size={16} color="#059669" />
          </div>
          <div className="text-2xl font-bold text-green-700">{completed}</div>
          <div className="text-xs text-green-600 font-medium">Done</div>
        </div>

        {/* Total Tasks */}
        <div className="bg-slate-50/80 border border-slate-200/50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="List" size={16} color="#64748b" />
          </div>
          <div className="text-2xl font-bold text-slate-700">{total}</div>
          <div className="text-xs text-slate-600 font-medium">Total</div>
        </div>
      </div>

      {/* Progress Section */}
      {total > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">Completion Progress</span>
            <span className="text-2xl font-bold text-slate-800">{completionRate}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionRate}%` }}
            />
            {/* Progress shimmer effect */}
            <div 
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
              style={{ 
                transform: `translateX(-100%)`,
                animation: completionRate > 0 ? 'shimmer 2s infinite' : 'none'
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>{completed} completed</span>
            <span>{active} remaining</span>
          </div>
        </div>
      )}

      {/* Productivity Message */}
      {total > 0 && (
        <div className={`${productivity.bg} border-2 border-current/10 rounded-xl p-4 mb-6`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${productivity.bg} border-2 border-current/20 rounded-full flex items-center justify-center`}>
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <p className={`font-semibold ${productivity.color}`}>
                {productivity.message}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Keep up the great work and stay focused on your goals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Clear Completed Button */}
      {completed > 0 && (
        <div className="pt-4 border-t border-slate-200/60">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
            className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
          >
            Clear {completed} Completed Task{completed !== 1 ? 's' : ''}
          </Button>
        </div>
      )}

      {/* Quick Stats Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200/40">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-slate-50/60 rounded-lg">
            <div className="text-lg font-bold text-slate-700">
              {active > 0 ? Math.ceil(active / 3) : 0}
            </div>
            <div className="text-xs text-slate-500">Est. Hours Left</div>
          </div>
          <div className="p-3 bg-slate-50/60 rounded-lg">
            <div className="text-lg font-bold text-slate-700">
              {total > 0 ? Math.ceil(total * 0.8) : 0}%
            </div>
            <div className="text-xs text-slate-500">Efficiency Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;

/* Add keyframe for shimmer animation */
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);