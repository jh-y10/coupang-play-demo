import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/esm/Spinner";
import { Alert } from "bootstrap";
import "./MoviePage.style.css";
import pageStore from "../../stores/pageStore";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const Moviepage = () => {
  const { page, updatePage } = pageStore();
  const [sortPopularity, setSortPopularity] = useState(null);
  const [sortGenre, setSortGenre] = useState(null);
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const { data: genreData } = useMovieGenreQuery();

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const handlePageClick = ({ selected }) => {
    updatePage(selected + 1);
  };

  const sortHandler = () => {
    let sortMovieList = data?.results;

    if (sortGenre !== null) {
      sortMovieList = sortMovieList.filter((movie) =>
        movie.genre_ids.includes(sortGenre)
      );
    }

    if (sortPopularity !== null) {
      switch (sortPopularity) {
        case "popularity":
          sortMovieList.sort((a, b) => b.vote_count - a.vote_count);
          break;
        case "unpopularity":
          sortMovieList.sort((a, b) => a.vote_count - b.vote_count);
          break;
        default:
          break;
      }
    }

    // updatePage(1);
    return sortMovieList;
  };

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="sort-box">
          <DropdownButton id="dropdown-basic-button" title="인기 순">
            <Dropdown.Item
              onClick={() => {
                setSortPopularity("popularity");
                updatePage(1);
              }}
            >
              많은 순
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSortPopularity("unpopularity");
                updatePage(1);
              }}
            >
              적은 순
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="장르 별">
            {genreData?.map((genre, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setSortGenre(genre.id);
                  updatePage(1);
                }}
              >
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        {data?.results.length === 0 ? (
          <Col lg={8} xs={12} className="no-search">
            <p>검색 결과가 없습니다</p>
          </Col>
        ) : (
          <Col lg={8} xs={12}>
            <Row>
              {sortHandler().map((movie, index) => (
                <Col key={index} lg={4} xs={6}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages > 500 ? 500 : data?.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Moviepage;
