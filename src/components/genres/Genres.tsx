import Chip from "@mui/material/Chip";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}: any) => {
  const handleAdd = (genre: any) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g: any) => g.id !== genre.id));
    setPage(1);
  };
  const REACT_APP_API_KEY = "8f781d70654b5a6f2fa69770d1d115a3";

  const handleRemove = (genre: any) => {
    setSelectedGenres(
      selectedGenres.filter((selected: any) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    console.log("A");
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre: any) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres?.map((genre: any) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
