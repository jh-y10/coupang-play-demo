import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMovieDetailsQuery } from "../../hooks/useMovieDetails";
import { useParams } from "react-router";
import "./MovieDetail.style.css";
import { useReviewsQuery } from "../../hooks/useGetReviews";
import { useVideoQuery } from "../../hooks/useGetVideo";
import YouTube from "react-youtube";

const MovieDetail = () => {
  const [viewMore, setViewMore] = useState({
    0: false,
    1: false,
    2: false,
  });
  let { id } = useParams();
  const { data } = useMovieDetailsQuery({ id });
  const { data: reviewData } = useReviewsQuery({ id });
  const { data: videoData } = useVideoQuery({ id });

  console.log("ddd", videoData);

  const posterImgUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`;

  const handleViewMore = (event, index) => {
    if (viewMore[index] === false) {
      event.target.textContent = "접기";
      setViewMore({ ...viewMore, [index]: true });
    } else {
      event.target.textContent = "더보기";
      setViewMore({ ...viewMore, [index]: false });
    }
  };

  const opts = {
    height: "300",
    width: "100%",
  };

  return (
    <Container>
      <Row>
        <Col lg={6} className="posterImg">
          <img src={posterImgUrl} alt="" />
        </Col>
        <Col lg={6} className="detail-desc">
          <h1>{data?.title}</h1>
          <p>{data?.tagline}</p>
          <p className="date-box">
            <span>{data?.runtime}분</span>
            <span>{data?.release_date}</span>
          </p>
          <div className="score-box">
            <span>{data?.vote_average.toFixed(1)}</span>
            <span>{Math.round(data?.popularity)}</span>
          </div>
          <p>{data?.overview}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="review">
          <h2>Reviews</h2>
          {reviewData?.map((review, index) => (
            <Col lg={12} key={index}>
              <h3>{review.author}</h3>
              <p className={viewMore[index] ? "no-more" : ""}>
                {review.content}
              </p>
              <button
                type="button"
                onClick={(event) => handleViewMore(event, index)}
              >
                더보기
              </button>
            </Col>
          ))}
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="movie-video">
          <h2>Video</h2>
          <YouTube videoId={videoData && videoData[0].key} opts={opts} className="video" />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
