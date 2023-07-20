import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MovieCard from "../moviecard.component/movieCard";
import './get-all-movies.styles.scss'

const GetallMovies = () => {
  const [allMovies, setAllMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/movies/get-all")
      .then((res) => {
        setAllMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      return ()=>{
        setAllMovies([])
      }
  }, []);
  return (
    <div className="get-all-container">
      {allMovies.length ? (
        allMovies.map((elem) => <MovieCard key={elem._id} data={elem} />)
      ) : (
        <h2>no Movie in database</h2>
      )}
    </div>
  );
};
export default GetallMovies;
