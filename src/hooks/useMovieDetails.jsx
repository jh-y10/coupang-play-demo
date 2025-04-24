import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetails = ({ id }) => {
  return api.get(`/movie/${id}`);
};

export const useMovieDetailsQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-details", { id }],
    queryFn: () => fetchMovieDetails({ id }),
    select: (data) => data.data,
  });
};
