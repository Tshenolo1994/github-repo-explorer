import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSearch } from "../context/SearchContext";
import { FaTimes } from "react-icons/fa";

interface SearchBarProps {
  defaultQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultQuery = "" }) => {
  const [inputValue, setInputValue] = useState(defaultQuery);
  const { performSearch, clearSearch, loading, query } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    setInputValue(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (trimmedInput) {
      await performSearch(trimmedInput);

      const searchParams = new URLSearchParams(location.search);
      searchParams.set("q", trimmedInput);

      navigate(
        {
          pathname: "/search",
          search: searchParams.toString(),
        },
        { replace: true }
      );
    }
  };

  const handleClearSearch = () => {
    setInputValue("");
    clearSearch();
  };

  useEffect(() => {
    if (query === "" && location.pathname === "/search") {
      navigate("/search", { replace: true });
    }
  }, [query, location.pathname, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex flex-col sm:flex-row rounded-lg p-1 sm:p-2 relative z-10 gap-2"
        style={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`,
        }}
      >
        <input
          type="text"
          placeholder="Search GitHub repositories..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent border-none p-1 sm:p-2 focus:outline-none text-sm sm:text-base"
          style={{ color: theme.text }}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          {inputValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-4 py-2 text-gray-700"
              style={{ backgroundColor: "#a6a6a6" }}
            >
              <FaTimes />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white font-medium disabled:opacity-50"
            style={{ backgroundColor: theme.buttonAccent }}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;