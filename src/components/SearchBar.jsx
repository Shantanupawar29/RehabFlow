import React from "react";
import { useSearch } from "../context/SearchContext"; // ✅ correct path

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search services..."
      className="border p-2 rounded w-full"
    />
  );
}
