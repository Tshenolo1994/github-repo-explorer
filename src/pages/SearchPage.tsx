import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSearch } from "../context/SearchContext";
import SearchBar from "../components/SearchBar";
import RepositoryCard from "../components/repository/RepositoryCard";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import PaginationControls from "../components/uiLayout/PaginationControls";
import { formatNumberWithSuffix } from "../utils/format";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const {
    query,
    repositories,
    loading,
    error,
    totalCount,
    page,
    perPage,
    performSearch,
    setPage,
    setPerPage,
  } = useSearch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("q");
    const pageParam = searchParams.get("page");

    if (queryParam && queryParam !== query) {
      performSearch(queryParam, pageParam ? parseInt(pageParam) : 1);
    }
  }, [location.search, performSearch, query]);

  useEffect(() => {
    performSearch(query, page);
  }, [page, perPage, performSearch, query]);

  return (
    <Box
      sx={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "calc(100vh - 64px)",
        padding: 3,
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box sx={{ mb: 4, mt: 10 }}>
          <SearchBar defaultQuery={query} />
        </Box>

        {query && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">
              {formatNumberWithSuffix(totalCount)} repositories found for{" "}
              <Typography component="span" fontWeight="bold">
                {query}
              </Typography>
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 12 }}>
            <CircularProgress size={48} style={{ color: theme.linkColor }} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            <strong>Error:</strong> {error}
          </Alert>
        ) : repositories.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 12, color: theme.secondaryText }}>
            {query
              ? "No repositories found. Try a different search term."
              : "Enter a search term to find repositories."}
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {repositories.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </Box>

            <PaginationControls
              page={page}
              perPage={perPage}
              totalCount={totalCount}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;