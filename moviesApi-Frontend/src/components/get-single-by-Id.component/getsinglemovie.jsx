import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import MovieCard from "../moviecard.component/movieCard";
import "./getsinglemovie.styles.scss";

const GetSingleMovie = () => {
  const inputId = useRef(null);
  const [movieSingle, setMovieSingle] = useState({});
  const getSingleSubmitHandler = (e) => {
    e.preventDefault();
    try {
      axios
        .get("http://localhost:3000/movies/get-single", {
          params: {
            id: inputId.current.value,
          },
        })
        .then((res) => {
          setMovieSingle(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={getSingleSubmitHandler}>
        <input type="text" placeholder="Enter Movie ID" ref={inputId}></input>
        <button>get Movie</button>
      </form>
      <div className="single-movie-container">
        {Object.values(movieSingle).length > 0 ? (
          <MovieCard data={movieSingle} />
        ) : (
          <p>No Input</p>
        )}
      </div>
    </div>
  );
};
export default GetSingleMovie;
