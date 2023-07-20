import axios from "axios";
import { useEffect, useState, useRef } from "react";
import MovieCard from "../moviecard.component/movieCard";
import "./getpages.styles.scss";

const GetPages = () => {
  const [moviesCount, setMoviesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const pageSizeRef = useRef(null);
  useEffect(() => {
    try {
      axios.get("http://localhost:3000/movies/count").then((res) => {
        setMoviesCount(res.data.count);
        setTotalPages(Math.ceil(moviesCount / pageSize));
      });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (moviesCount) {
      try {
        axios
          .get("http://localhost:3000/movies/get-paginated", {
            params: { page: currentPage, size: pageSize },
          })
          .then((res) => {
            setMovieList(res.data);
            setTotalPages(Math.ceil(moviesCount / pageSize));
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [currentPage, moviesCount, pageSize]);

  useEffect(() => {
    if (currentPage && totalPages) {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }
  }, [totalPages]);

  const handler = (e) => {
    e.preventDefault();
    setPageSize(pageSizeRef.current.value);
    pageSizeRef.current.value = null;
  };
  return (
    <div>
      <p className="count-container">Total Movies :{moviesCount}</p>
      <div className="count-container">
        {currentPage > 1 ? (
          <button
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
          >
            prev
          </button>
        ) : (
          <button>prev</button>
        )}
        <span>
          {currentPage}/{totalPages}
        </span>
        {currentPage <= totalPages - 1 ? (
          <button
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            next
          </button>
        ) : (
          <button>next</button>
        )}
      </div>
      <form onSubmit={handler}>
        <input
          type="number"
          placeholder="Enter Page Size"
          ref={pageSizeRef}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div className="page-container">
        {moviesCount > 0 ? (
          movieList.map((elem) => <MovieCard key={elem._id} data={elem} />)
        ) : (
          <p>No movie to display</p>
        )}
      </div>
    </div>
  );
};
export default GetPages;
