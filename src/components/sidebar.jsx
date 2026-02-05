import React from 'react';
import { Plus, MessageSquare, Trash2, X, Sparkles } from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, sessions, activeId, onSelect, onNew, onDelete }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 text-slate-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out border-r border-slate-800 flex flex-col`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2 text-white font-bold text-xl italic">
          <Sparkles className="text-indigo-400" /> WichDoc
        </div>
        <button onClick={onClose} className="md:hidden text-slate-400"><X /></button>
      </div>
      
      <div className="px-4 mb-4">
        <button onClick={onNew} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg transition-all active:scale-95">
          <Plus size={18} /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {sessions.map(s => (
          <div 
            key={s.id} 
            onClick={() => { onSelect(s.id); onClose(); }} 
            className={`group p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${activeId === s.id ? 'bg-slate-800 text-white shadow-inner' : 'hover:bg-slate-800/40 text-slate-400'}`}
          >
            <MessageSquare size={16} className={activeId === s.id ? 'text-indigo-400' : 'text-slate-500'} />
            <span className="truncate flex-1 text-sm font-medium">{s.title || "Untitled Chat"}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} 
              className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};