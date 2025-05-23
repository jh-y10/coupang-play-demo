import React from "react";
import { useMoviesQuery } from "../../../../hooks/useGetMovies";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import "./RatedMovieSlide.style.css";

const RatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useMoviesQuery("top_rated");

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <MovieSlider
      title="Top Rated Movies"
      movies={data.results}
      responsive={responsive}
      subject="top-rated"
    />
  );
};

export default RatedMovieSlide;
