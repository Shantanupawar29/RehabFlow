// src/components/ServiceList.jsx
import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { useSearch } from "../context/SearchContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function ServiceList() {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    setSearchResults,
    isSearching 
  } = useSearch();
  
  const debouncedSearch = useDebounce(searchTerm);
  const { data: services, loading, error } = useFetch("/api/services"); // Updated to use API endpoint

  useEffect(() => {
    if (services) {
      if (debouncedSearch.trim() === "") {
        setSearchResults(services);
      } else {
        const results = services.filter(service =>
          service.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          service.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setSearchResults(results);
      }
    }
  }, [debouncedSearch, services, setSearchResults]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isSearching && (
        <p className="text-sm text-gray-500">
          {searchResults.length} results found
        </p>
      )}

      {searchResults.length > 0 ? (
        <ul className="space-y-4">
          {searchResults.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No services found</p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-2 text-primary-light hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const ServiceCard = ({ service }) => (
  <li className="p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
    <h2 className="text-xl font-bold text-primary-dark dark:text-white">
      {service.name}
    </h2>
    <p className="mt-2 text-gray-600 dark:text-gray-300">
      {service.description}
    </p>
    <div className="mt-3 flex justify-between items-center">
      <span className="text-sm font-medium text-primary-light">
        {service.duration} min session
      </span>
      <Link
        to={`/book?service=${encodeURIComponent(service.name)}`}
        className="px-4 py-2 bg-button-light hover:bg-secondary-light text-white rounded-lg text-sm font-medium transition-colors"
      >
        Book Now
      </Link>
    </div>
  </li>
);
