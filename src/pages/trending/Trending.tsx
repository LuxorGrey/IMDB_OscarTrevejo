import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../components/pagination/Pagination";
import { ResponseData } from "../../config/types";
import { SECONDARY_COLOR } from "../../config/colors";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);



  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    window?.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle" style={{ backgroundColor: SECONDARY_COLOR }}>Trending Today</span>
      <div className="trending">
        {content &&
          content.map((c: ResponseData) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
