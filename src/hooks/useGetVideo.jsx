import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchVideo = ({ id }) => {
  return api.get(`/movie/${id}/videos`);
};

export const useVideoQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-video", { id }],
    queryFn: () => fetchVideo({ id }),
    select: (data) => data.data.results,
  });
};
