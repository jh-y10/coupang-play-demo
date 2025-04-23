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

const Moviepage = () => {
  const { page, updatePage } = pageStore();
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const handlePageClick = ({ selected }) => {
    updatePage(selected + 1);
  };

  console.log(data);

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}></Col>
        {data?.results.length === 0 ? (
          <Col lg={8} xs={12} className="no-search">
            <p>검색 결과가 없습니다</p>
          </Col>
        ) : (
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
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
