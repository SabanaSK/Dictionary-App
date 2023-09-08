//The search field and logic for fetching words.
import { useState } from "react";

const Searchbar = ({setWords}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Search field cannot be empty"); 
      return;
    }
    setWords(searchQuery);
  };


  return (
    <form onSubmit={submitHandle}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a word..."
      />
       <button type="submit">Search</button>
    </form>
  )
};

export default Searchbar;

