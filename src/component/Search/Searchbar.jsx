import { useState } from "react";

import styles from "./Searchbar.module.css";

// Searchbar-komponenten tar in setSearchQuery som en prop
const Searchbar = ({ setSearchQuery }) => {
  const [whileSearch, setWhileSearch] = useState("")
  const [isEmptySearch, setIsEmptySearch] = useState(false);

  // Hanterar sumbit av formuläret
  const submitHandle = (e) => {
    e.preventDefault(); // Förhindra sidomladdning
    // Kontrollera om sökfältet är tomt
    if (whileSearch.trim() === "") {
      setIsEmptySearch(true); // Sätt isEmptySearch till true om fältet är tomt
    } else {
      setIsEmptySearch(false); // Annars sätt det till false
    }
    setSearchQuery(whileSearch); // Uppdatera sökfrågan
  };
  

  return (
    <div>
      <form onSubmit={submitHandle} className={styles.formWrapper}>
        <label htmlFor="searchInput">Search for a word: </label>
        <input
          id="searchInput"
          type="text"
          value={whileSearch}
          onChange={(e) => {
            setWhileSearch(e.target.value);
            setIsEmptySearch(false);
          }}
          placeholder="Enter a word..."
          className={styles.inputField}
        />
        <button type="submit">Search</button>
      </form>
       {/* Visa ett felmeddelande om sökfältet är tomt */}
      {isEmptySearch && <p>Please enter a word to search for its definition.</p>}
    </div>
  );
};

export default Searchbar;
