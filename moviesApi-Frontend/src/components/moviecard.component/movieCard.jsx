import axios from "axios";
import { useEffect, useState } from "react";
import "./movieCard.styles.scss";
/* eslint-disable react/prop-types */
const MovieCard = (props) => {
  const [posterUrl, setPosterUrl] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=bb7fcbd1431c57e46a0bc71210e2aa30&query=${props.data.title}&year=${props.data.releaseYear}`
      )
      .then((res) => {
        setPosterUrl(
          `http://image.tmdb.org/t/p/w500${res.data.results[0].poster_path}`
        );
      });
  }, []);
  return (
    <div className="card">
      <img src={posterUrl} />
      <div className="card__content">
        <p className="card__title">Title: {props.data.title}</p>
        <p>ID: {props.data._id}</p>
        <p>Director: {props.data.director}</p>
        <p>Release Year: {props.data.releaseYear}</p>
        <p className="card__description">Overview: {props.data.overview}</p>
      </div>
    </div>
  );
};
export default MovieCard;
