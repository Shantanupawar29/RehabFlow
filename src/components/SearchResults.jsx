import React from "react";
import { useSearch } from "../context/SearchContext";

const SearchResults = () => {
  const { searchResults, isSearching } = useSearch();

  return (
    <div className="mt-4">
      {isSearching ? (
        searchResults.length > 0 ? (
          <ul className="list-disc pl-6">
            {searchResults.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>No matching services found.</p>
        )
      ) : (
        <p>Start searching for a service...</p>
      )}
    </div>
  );
};

export default SearchResults;
