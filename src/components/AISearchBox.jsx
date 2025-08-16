// src/components/AISearchBox.jsx
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAISuggestions from "../hooks/useAISuggestions";

export default function AISearchBox({ onSuggestionSelect }) {
  const [input, setInput] = useState("");
  const { suggestions, loading, error } = useAISuggestions(input);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSuggestionSelect?.(suggestion);
  };

  return (
    <div className="relative">
      {/* Search Input with Glassmorphism */}
      <div className="flex items-center px-3 py-1 rounded-lg bg-white/30 dark:bg-gray-700/30 border border-white/20 backdrop-blur-md shadow-md">
        <FiSearch className="text-gray-600 dark:text-gray-300 mr-2" />
        <input
          type="text"
          placeholder="Type to get smart suggestions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-[200px] bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          disabled={loading}
        />
        {loading && (
          <div className="ml-2 animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && !error && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100/60 dark:hover:bg-gray-700/60 dark:text-gray-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute top-full left-0 mt-1 w-full text-xs text-red-500">
          AI service unavailable
        </div>
      )}
    </div>
  );
}
