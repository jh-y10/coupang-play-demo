import React from "react";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        <span>
          {movie.genre_ids.map((id) => {
            id;
          })}
        </span>
        <span>{movie.vote_average}</span>
        <span>
          {Math.round(movie.popularity)}
          <br />
        </span>
        {movie.adult ? (
          <p className="adult">18+</p>
        ) : (
          <p className="non-adult">Under18</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
