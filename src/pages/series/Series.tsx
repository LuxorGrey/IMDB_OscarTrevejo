import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/genres/Genres";
import CustomPagination from "../../components/pagination/Pagination";
import SingleContent from "../../components/singleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import { GenreIndividual, ResponseData } from "../../config/types";
import { SECONDARY_COLOR } from "../../config/colors";

const Series = () => {
  const [genres, setGenres] = useState<GenreIndividual[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenreIndividual[]>([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle" style={{ backgroundColor: SECONDARY_COLOR }}>Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c: ResponseData) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
