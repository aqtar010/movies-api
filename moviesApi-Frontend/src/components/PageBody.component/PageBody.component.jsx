import { useRef, useState } from "react";
import './pagebody.styles.scss'
import AddMovie from "../addmovie.component/addmovie";
import GetallMovies from "../get-all-movies.component/get-all-movies";
import GetSingleMovie from "../get-single-by-Id.component/getsinglemovie";
import GetPages from "../get-movie-pages.component/getpages";
const PageBody = () => {
  const inputValue = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const handleSelectChange = () => {
    setSelectedOption(inputValue.current.value);
  };
  return (
    <>
      <div className="main-choice-container">
        <label htmlFor="options">Select</label>
        <select
          id="options"
          ref={inputValue}
          onChange={(e) => handleSelectChange(e)}
          className="page-selector"
        >
          <option>Select an option</option>
          <option>Add Movie</option>
          <option>List All</option>
          <option>List Single</option>
          <option>Page List</option>
        </select>
      </div>

      {selectedOption === "Select an option" && <h1 style={{display:'flex',alignItems:'center',justifyContent:"center"}}>No options Selected</h1>}
      {selectedOption === "Add Movie" && <AddMovie />}
      {selectedOption === "List All" && <GetallMovies />}
      {selectedOption === "List Single" && <GetSingleMovie />}
      {selectedOption === "Page List" && <GetPages />}
    </>
  );
};
export default PageBody;
