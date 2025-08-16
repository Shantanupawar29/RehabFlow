// src/hooks/useAISuggestions.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Configuration - consider moving to a separate config file
const CONFIG = {
  MODEL: "distilgpt2",
  API_URL: "https://api-inference.huggingface.co/models",
  FALLBACK_MODEL: "gpt2", // Fallback if primary model fails
  MAX_LENGTH: 50,
  TEMPERATURE: 0.7,
  DEBOUNCE_DELAY: 500,
  TIMEOUT: 10000,
};

export default function useAISuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const processResponse = (generatedText, queryText) => {
    if (!generatedText) return ["No suggestions available"];
    
    // Extract the most relevant parts
    return generatedText
      .replace(queryText, "")
      .split('\n')[0] // Take first line
      .replace(/[^a-zA-Z0-9 ]/g, '') // Remove special chars
      .trim()
      .split(' ')
      .filter(word => word.length > 3) // Filter short words
      .slice(0, 5) // Get top 5 words
      .map(word => word.toLowerCase());
  };

  const fetchSuggestions = useCallback(async (queryText, model = CONFIG.MODEL) => {
    if (!queryText.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(
        `${CONFIG.API_URL}/${model}`,
        { 
          inputs: queryText,
          parameters: {
            max_length: CONFIG.MAX_LENGTH,
            temperature: CONFIG.TEMPERATURE,
          }
        },
        { 
          headers: { 
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: CONFIG.TIMEOUT
        }
      );

      setSuggestions(processResponse(response.data[0]?.generated_text, queryText));
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error("API Error:", err);
      
      // If model is loading, try again after delay
      if (err.response?.status === 503 && retryCount < 2) {
        setTimeout(() => {
          setRetryCount(c => c + 1);
          fetchSuggestions(queryText, model);
        }, 2000);
        return;
      }
      
      // Try fallback model if primary fails
      if (model === CONFIG.MODEL && CONFIG.FALLBACK_MODEL) {
        fetchSuggestions(queryText, CONFIG.FALLBACK_MODEL);
        return;
      }

      setError(getErrorMessage(err));
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  const getErrorMessage = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: return "Invalid API key";
        case 429: return "Rate limit exceeded";
        case 503: return "Model is loading, try again soon";
        default: return "Service unavailable";
      }
    }
    return error.message || "Failed to get suggestions";
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, CONFIG.DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimer);
  }, [query, fetchSuggestions]);

  return { suggestions, loading, error };
}