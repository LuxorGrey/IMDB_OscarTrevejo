import React from "react";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SECONDARY_COLOR } from "../../config/colors";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: SECONDARY_COLOR
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

type CustomPaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numOfPages?: number;
};

export default function CustomPagination({
  setPage,
  numOfPages = 10,
}: CustomPaginationProps) {
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
          onChange={(e: React.ChangeEvent<unknown>, page: number) =>
            handlePageChange(page)
          }
          count={numOfPages}
          size="large"
        />
      </ThemeProvider>
    </div>
  );
}
