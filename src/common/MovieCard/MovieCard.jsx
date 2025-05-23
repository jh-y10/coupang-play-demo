import React from "react";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

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

  const goToDetail = () => {
    navigate(`/movies/${movie.id}`);
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
      onClick={goToDetail}
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
        <span>{movie.vote_average.toFixed(1)}</span>
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
