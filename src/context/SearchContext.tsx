import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { searchRepositories } from "../services/githubApi";
import { Repository, SearchResult } from "../types";

interface SearchContextType {
  query: string;
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  perPage: number;
  setQuery: (query: string) => void;
  performSearch: (query: string, page?: number) => Promise<void>;
  clearSearch: () => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const performSearch = useCallback(
    async (searchQuery: string, page: number = 1): Promise<void> => {
      if (!searchQuery.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const result: SearchResult = await searchRepositories(
          searchQuery,
          page,
          perPage
        );
        setRepositories(result.items);
        setTotalCount(result.total_count);
        setQuery(searchQuery);
        setPage(page);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setRepositories([]);
        setTotalCount(0);
        setQuery("");
        setPage(1);
      } finally {
        setLoading(false);
      }
    },
    [
      perPage,
      setQuery,
      setRepositories,
      setTotalCount,
      setPage,
      setLoading,
      setError,
    ]
  );

  const clearSearch = useCallback((): void => {
    setQuery("");
    setRepositories([]);
    setTotalCount(0);
    setError(null);
    setPage(1);
  }, [setQuery, setRepositories, setTotalCount, setError, setPage]);

  const updatePerPage = useCallback(
    (newPerPage: number): void => {
      setPerPage(newPerPage);
      if (query) {
        performSearch(query, 1);
      }
    },
    [query, performSearch]
  );

  const contextValue: SearchContextType = {
    query,
    repositories,
    loading,
    error,
    totalCount,
    page,
    perPage,
    setQuery,
    performSearch,
    clearSearch,
    setPage,
    setPerPage: updatePerPage,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
