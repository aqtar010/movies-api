import { Fragment } from "react";
import { useRef } from "react";
import axios from "axios";
import "./addmovie.styles.scss";
const AddMovie = () => {
  const Title = useRef(null);

  const Director = useRef(null);

  const ReleaseYear = useRef(null);
  const Overview = useRef(null);
  const movieAddHandler = (e) => {
    e.preventDefault();
    const MovieDetails = {
      title: Title.current.value,
      director: Director.current.value,
      releaseYear: ReleaseYear.current.value,
      overview: Overview.current.value,
    };
    console.log(MovieDetails);
    axios
      .post("http://localhost:3000/movies/add-movie", MovieDetails)
      .then((response) => {
        console.log("Movie added successfully:", response.data);
        Title.current.value = null;
        Director.current.value = null;
        ReleaseYear.current.value = null;
        Overview.current.value = null;
        // Handle success here if needed
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        // Handle error here if needed
      });
  };
  return (
    <Fragment>
      <div className="form-container">
        <form onSubmit={movieAddHandler}>
          <input
            type="text"
            placeholder="Movie Title"
            required
            ref={Title}
          ></input>
          <input
            type="text"
            placeholder="Director Name"
            required
            ref={Director}
          ></input>
          <input
            type="number"
            placeholder="Release Year"
            required
            ref={ReleaseYear}
          ></input>
          <input
            type="textArea"
            placeholder="Enter Overview"
            ref={Overview}
          ></input>
          <br />
          <button>Add Movie</button>
        </form>
      </div>
    </Fragment>
  );
};
export default AddMovie;
