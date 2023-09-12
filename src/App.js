import { useEffect, useState } from "react";
import Searchbar from "./component/Search/Searchbar";
import Result from "./component/Result/Result";
import "./App.css";

const fetchWordData = async (word) => {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (res.status !== 200) {
    throw new Error(`Could not fetch the data. Status code: ${res.status}`);
  }
  return await res.json();
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      setDefinition(null);
      setAudioUrl(null);
      return;
    }
    console.log("query", searchQuery);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWordData(searchQuery);
        const firstWordData = data[0];
        if (firstWordData && firstWordData.meanings) {
          const allDefinitions = firstWordData.meanings
            .map((meaning) => meaning.definitions)
            .flat();
          setDefinition(allDefinitions);
          if (firstWordData.phonetics && firstWordData.phonetics[0].audio) {
            setAudioUrl(firstWordData.phonetics[0].audio);
          }
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="container">
      <h1 className="title">Welcome to Dictionary App</h1>
      <Searchbar setWords={setSearchQuery} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          <p>
            Error: No definition found. Refresh the page and try again with new
            words.
          </p>
        </div>
      ) : (
        <Result definition={definition} audioUrl={audioUrl} />
      )}
    </div>
  );
}

export default App;
