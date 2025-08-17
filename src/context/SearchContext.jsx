import React, { createContext, useState, useContext, useCallback } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // put your real services here
  const services = [
    { id: 1, title: "Therapeutic Ultrasound" },
    { id: 2, title: "Cupping Therapy" },
    { id: 3, title: "Myofascial Release" },
    { id: 4, title: "Hand Therapy" },
    { id: 5, title: "Interferential Therapy (IFT)" },
    { id: 6, title: "Trigger Point Release" },
  ];

  const updateSearchTerm = useCallback(
    (term) => {
      setSearchTerm(term);
      setIsSearching(term.trim() !== "");

      if (term.trim()) {
        const filtered = services.filter((s) =>
          s.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
    },
    [services]
  );

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm: updateSearchTerm,
        searchResults,
        isSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
