import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReviews = ({ id }) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useReviewsQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-reviews", { id }],
    queryFn: () => fetchReviews({ id }),
    select: (data) => data.data.results,
  });
};
