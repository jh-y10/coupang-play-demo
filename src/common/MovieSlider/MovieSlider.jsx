import React from "react";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, responsive, subject }) => {
  return (
    <div className={subject ? `movie-slide ${subject}` : "movie-slide"}>
      <h3>{title}</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        customTransition="all 1000ms ease-in-out"
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
