import React, { createContext, useState, useContext, useCallback } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
    setIsSearching(term.trim() !== "");
  }, []);

  return (
    <SearchContext.Provider 
      value={{ 
        searchTerm, 
        setSearchTerm: updateSearchTerm,
        searchResults,
        setSearchResults,
        isSearching
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
