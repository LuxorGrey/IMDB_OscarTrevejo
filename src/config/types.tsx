export interface ResponseData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: string;
}
export interface CastData {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export interface GalleryProps {
  id: number;
  media_type: "movie" | "tv";
}
export interface ContentProps {
  children: React.ReactNode;
  media_type: "movie" | "tv";
  id: number;
}

export interface GenreData {
    selectedGenres: GenreIndividual[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<GenreIndividual[]>>;
    genres: GenreIndividual[];
    setGenres: React.Dispatch<React.SetStateAction<GenreIndividual[]>>;
    type: string;
    setPage: (page: number) => void;
  }
export interface GenreIndividual {
    id:number,
    name:string
  }
export interface SingleContentProps {
    id: number;
    poster: string;
    title: string;
    date: string;
    media_type: any;
    vote_average: number;
  }
