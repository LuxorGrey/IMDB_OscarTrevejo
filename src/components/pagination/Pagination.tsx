import React from "react";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#2d313a",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

export default function CustomPagination({ setPage, numOfPages = 10 }: any) {
  // Scroll to top when page changes
  const handlePageChange = (page: number) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        color: "white",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          variant="outlined"
          shape="rounded"
          onChange={(e: any) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          size="large"
        />
      </ThemeProvider>
    </div>
  );
}
