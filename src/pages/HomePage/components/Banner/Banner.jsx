import React from "react";
import { useMoviesQuery } from "../../../../hooks/useGetMovies";
import { Alert } from "bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = useMoviesQuery("popular");

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}` +
          ")",
      }}
    >
      <div className="banner-desc">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
