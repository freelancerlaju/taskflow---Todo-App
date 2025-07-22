import React from 'react';
import Icon from '../AppIcon';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Main Content */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Todo Dashboard</h3>
              <p className="text-sm text-slate-600">Professional task management solution</p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/freelancerlaju"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
                aria-label="Visit GitHub Profile"
              >
                <Icon name="Github" size={18} />
                <span className="font-medium group-hover:underline">GitHub</span>
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center lg:text-right">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-600">
              <span>&copy; {new Date().getFullYear()} Todo Dashboard.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Built with React & Tailwind CSS
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mt-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>Version 1.0.0</span>
            <span>Last updated: July 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;