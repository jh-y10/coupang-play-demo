import React from "react";
import { useMoviesQuery } from "../../../../hooks/useGetMovies";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert } from "bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import "./UpcomingMovieSlide.style.css";

const UncomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useMoviesQuery("upcoming");

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <MovieSlider
      title="Upcoming Movies"
      movies={data.results}
      responsive={responsive}
      subject="upcoming"
    />
  );
};

export default UncomingMovieSlide;
