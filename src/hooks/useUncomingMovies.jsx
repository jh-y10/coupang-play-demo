import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUncomingMovies = () => {
  return api.get("/movie/upcoming");
};

export const useUncomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-uncoming"],
    queryFn: fetchUncomingMovies,
    select: (result) => result.data,
  });
};
