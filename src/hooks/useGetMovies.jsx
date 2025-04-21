import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovies = (subject) => {
  return api.get(`/movie/${subject}`);
};

export const useMoviesQuery = (subject) => {
  return useQuery({
    queryKey: [`movie-${subject}`],
    queryFn: () => fetchMovies(subject),
    select: (result) => result.data,
  });
};