import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TodoInput = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Create New Task</h2>
        <p className="text-slate-600">Add a new task to your workflow and stay organized</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.01]' : ''}`}>
            <Input
              type="text"
              placeholder="Describe your task in detail..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="text-base py-4 px-5 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
            />
            {inputValue.trim() && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={18}
            disabled={!inputValue.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            Add Task
          </Button>
          
          {inputValue.trim() && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setInputValue('')}
              className="px-6 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] bg-white/60 backdrop-blur-sm"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        {inputValue.trim() && (
          <div className="pt-4 border-t border-slate-200/60">
            <p className="text-xs text-slate-500 mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {['📧 Email', '📞 Call', '📝 Write', '🎯 Plan', '💡 Research'].map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setInputValue(suggestion + ' ' + inputValue)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoInput;