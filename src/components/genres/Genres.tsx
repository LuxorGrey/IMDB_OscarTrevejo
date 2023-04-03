import Chip from "@mui/material/Chip";
import axios from "axios";
import { useEffect } from "react";
import { GenreData, GenreIndividual } from "../../config/types";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}: GenreData) => {
  const handleAdd = (genre: GenreIndividual) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g: GenreIndividual) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre: GenreIndividual) => {
    setSelectedGenres(
      selectedGenres.filter(
        (selected: GenreIndividual) => selected.id !== genre.id
      )
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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
      {selectedGenres.map((genre: GenreIndividual) => (
        <Chip
          style={{ margin: 2, color: "white" }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres?.map((genre: GenreIndividual) => (
        <Chip
          style={{ margin: 2, color: "white" }}
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
