import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/pagination/Pagination";
import SingleContent from "../../components/singleContent/SingleContent";
import { ResponseData } from "../../config/types";
import { SECONDARY_COLOR } from "../../config/colors";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<ResponseData[]>([]);
  const [numOfPages, setNumOfPages] = useState(0);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: SECONDARY_COLOR,
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            sx={{ input: { color: "white" } }}
            style={{ flex: 1 }}
            label={<div style={{ color: "white" }}>Search</div>}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10, backgroundColor: SECONDARY_COLOR }}
          >
            <SearchIcon fontSize="large" style={{ color: "white" }} />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%", color: "white" }} label="Search Movies" />
          <Tab
            style={{ width: "50%", color: "white" }}
            label="Search TV Series"
          />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c: ResponseData) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
