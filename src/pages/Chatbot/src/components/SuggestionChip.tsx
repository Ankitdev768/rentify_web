import React from 'react';

interface SuggestionChipProps {
  text: string;
  onClick: () => void;
  isDarkMode: boolean;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 bg-white/50 backdrop-blur-sm hover:bg-slate-100 rounded-xl text-sm text-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-200/50 hover:shadow-md hover:shadow-slate-200/50"
    >
      {text}
    </button>
  );
};

export default SuggestionChip;