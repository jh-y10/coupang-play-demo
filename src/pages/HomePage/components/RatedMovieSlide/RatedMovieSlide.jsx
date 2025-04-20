import React from "react";
import { useRatedMoviesQuery } from "../../../../hooks/useRatedMovies";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";
import "../PopularMovieSlide/PopularMovieSlide.style.css";
import "./RatedMovieSlide.style.css";

const RatedMovieSlide = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1850 },
      items: 8,
      slidesToSlide: 8,
    },
    largeDesktop: {
      breakpoint: { max: 1849, min: 1500 },
      items: 6,
      slidesToSlide: 6,
    },
    desktop: {
      breakpoint: { max: 1499, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    smallTablet: {
      breakpoint: { max: 767, min: 480 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 479, min: 0 },
      items: 1,
    },
  };

  const { data, isLoading, isError, error } = useRatedMoviesQuery();

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="movie-slide top-rated">
      <h3>Top Rated Movies</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        customTransition="all 1000ms ease-in-out"
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {data?.results.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default RatedMovieSlide;
