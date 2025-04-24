import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMovieDetailsQuery } from "../../hooks/useMovieDetails";
import { useParams } from "react-router";
import "./MovieDetail.style.css";

const MovieDetail = () => {
  let { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailsQuery({ id });

  const posterImgUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`;

  console.log("ddd", data);

  return (
    <Container>
      <Row>
        <Col lg={6} className="posterImg">
          <img src={posterImgUrl} alt="" />
        </Col>
        <Col lg={6} className="detail-desc">
          <h1>{data?.title}</h1>
          <p>{data?.tagline}</p>
          <div className="score-box">
            <span>{data?.vote_average.toFixed(1)}</span>
            <span>{Math.round(data?.popularity)}</span>
          </div>
          <p>{data?.overview}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
