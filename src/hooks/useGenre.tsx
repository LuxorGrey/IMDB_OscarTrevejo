import { GenreIndividual } from "../config/types";

const useGenre = (selectedGenres: any) => {
  if (selectedGenres.length < 1) return "";

  const GenreIds = selectedGenres.map((g: GenreIndividual) => g.id);
  return GenreIds.reduce((acc: string, curr:string) => acc + "," + curr);
};

export default useGenre;
