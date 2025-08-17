// src/hooks/useAISuggestions.js
import { useState, useEffect, useCallback } from 'react';

const useAISuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock AI suggestion generator (replace with real API/TensorFlow later)
  const generateSuggestions = useCallback(async (queryText) => {
    if (!queryText.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response based on query
      const mockDatabase = [
        { term: "physical therapy", category: "treatment" },
        { term: "pain management", category: "treatment" },
        { term: "posture correction", category: "exercise" },
        { term: "electrotherapy", category: "modality" },
        { term: "hydrotherapy", category: "treatment" },
        { term: "stretching exercises", category: "exercise" },
        { term: "joint mobilization", category: "technique" }
      ];

      const results = mockDatabase.filter(item =>
        item.term.toLowerCase().includes(queryText.toLowerCase())
      );

      setSuggestions(results.length > 0 
        ? results.map(item => item.term) 
        : ["therapy", "rehab", "exercise", "pain relief"]
      );
    } catch (err) {
      console.error("Suggestion error:", err);
      setError("Failed to load suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the search
  useEffect(() => {
    const timer = setTimeout(() => {
      generateSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, generateSuggestions]);

  return { suggestions, loading, error };
};

export default useAISuggestions;