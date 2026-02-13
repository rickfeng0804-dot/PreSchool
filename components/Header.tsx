import React from 'react';
import { School, User } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onHomeClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onHomeClick, isAdmin, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b-8 border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <div 
          className="flex items-center space-x-4 cursor-pointer group" 
          onClick={onHomeClick}
        >
          <div className="bg-yellow-400 p-3 rounded-2xl shadow-inner border-4 border-yellow-500 transform group-hover:rotate-12 transition-transform duration-300">
            <School className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight text-shadow-sm">
              愛愛幼兒園
            </h1>
            <span className="text-sm font-bold text-gray-400">學習歷程系統</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">園長</span>
            <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full border-2 border-gray-200">
              Rachel Huang
            </span>
          </div>
          
          {isAdmin ? (
            <button
              onClick={onLogout}
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-2xl border-b-4 border-red-600 active:border-b-0 active:translate-y-1 transition-all"
            >
              登出
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-pixar-blue hover:bg-pixar-blue-dark text-white font-bold py-2 px-6 rounded-2xl border-b-4 border-pixar-blue-dark active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
            >
              <User size={18} />
              <span className="hidden sm:inline">老師登入</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};