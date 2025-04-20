import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import RatedMovieSlide from "./components/RatedMovieSlide/RatedMovieSlide";
import UncomingMovieSlide from "./components/UncomingMovieSlide/UncomingMovieSlide";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <RatedMovieSlide />
      <UncomingMovieSlide />
    </div>
  );
};

export default Homepage;
