import { useState } from "react";

import styles from "./Searchbar.module.css";

const Searchbar = ({ setWords }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmptySearch, setIsEmptySearch] = useState(false);

  const submitHandle = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setIsEmptySearch(true);
      setWords(""); 
    } else {
      setIsEmptySearch(false);
      setWords(searchQuery);
    }
  };
  

  return (
    <div>
      <form onSubmit={submitHandle} className={styles.formWrapper}>
        <label htmlFor="searchInput">Search for a word: </label>
        <input
          id="searchInput"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsEmptySearch(false);
          }}
          placeholder="Enter a word..."
          className={styles.inputField}
        />
        <button type="submit">Search</button>
      </form>
      {isEmptySearch && <p>Please enter a word to search for its definition.</p>}
    </div>
  );
};

export default Searchbar;
