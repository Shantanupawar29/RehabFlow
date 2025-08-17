import { useState } from 'react';
import useAISuggestions from '../hooks/useAISuggestions';

const AISearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const { suggestions, loading, error } = useAISuggestions(inputValue);

  const handleSelect = (suggestion) => {
    setInputValue(suggestion);
    // Add your selection handler here
  };

  return (
    <div className="aisearch-container">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search treatments..."
          className="w-full p-2 pr-12 rounded-3xl bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/30 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          aria-label="Search rehabilitation treatments"
        />
        
        {loading && (
          <span className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </span>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 rounded-lg shadow-xl overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-3 hover:bg-white/50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-200 text-gray-800 dark:text-gray-100 border-b border-white/20 dark:border-gray-700/30 last:border-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AISearchBox;