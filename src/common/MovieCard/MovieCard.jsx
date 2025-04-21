import React from "react";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  console.log("ggg", genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

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
        <div className="genre-list">
          {showGenre(movie.genre_ids).map((genre, index) => (
            <span key={index}>
              {genre === "Science Fiction" ? "SF" : genre}
            </span>
          ))}
        </div>
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
