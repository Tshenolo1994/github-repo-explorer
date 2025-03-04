import React from "react";
import {
  Pagination,
  Select,
  MenuItem,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "../../context/ThemeContext";

interface PaginationControlsProps {
  page: number;
  perPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  perPage,
  totalCount,
  onPageChange,
  onPerPageChange,
}) => {
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  if (totalCount <= 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: isSmallScreen ? 2 : 0,
        mt: 4,
        backgroundColor: theme.surface,
        padding: 2,
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: theme.text }}>
          Items per page:
        </Typography>
        <Select
          value={perPage}
          onChange={(event: SelectChangeEvent<number>) =>
            onPerPageChange(event.target.value as number)
          }
          size="small"
          sx={{
            backgroundColor: theme.buttonBg,
            color: theme.text,
            "& .MuiSelect-icon": { color: theme.text },
            width: isSmallScreen ? "100%" : "auto",
          }}
          aria-label="Items per page"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Box>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => onPageChange(newPage)}
        color="primary"
        size={isSmallScreen ? "small" : "medium"}
        sx={{
          "& .MuiPaginationItem-root": {
            color: theme.text,
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: theme.buttonAccent,
            color: theme.text,
          },
        }}
        aria-label="Pagination"
      />
    </Box>
  );
};

export default PaginationControls;
