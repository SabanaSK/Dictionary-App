// Importera nödvändiga moduler från React och komponenter

import { useEffect, useState } from "react";
import Searchbar from "./component/Search/Searchbar";
import Result from "./component/Result/Result";
import "./App.css";

// Funktion för att hämta orddata från Free Dictionary API
const fetchWordData = async (word) => {
  // Göra en HTTP-anrop till API:et
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  // Kontrollera svarskoden
  if (res.status !== 200) {
    throw new Error(`Could not fetch the data. Status code: ${res.status}`);
  }
  // Returnera svaret som JSON
  return await res.json();
};

// Huvudkomponent för applikationen
function App() {
  // Använd state för att hantera olika variabler
  const [searchQuery, setSearchQuery] = useState("");
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  // Använd useEffect för att utföra sidoeffekter, som att hämta data
  useEffect(() => {
    // Om söksträngen är tom, nollställ definition och ljud-URL
    if (!searchQuery) {
      setDefinition(null);
      setAudioUrl(null);
      return;
    }

    // Asynkron funktion för att hämta data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Använd fetchWordData för att hämta data
        const data = await fetchWordData(searchQuery);
        const firstWordData = data[0];

        // Sätt definition och ljud-URL om de finns
        if (firstWordData && firstWordData.meanings) {
          setDefinition(firstWordData.meanings);
          if (firstWordData.phonetics && firstWordData.phonetics[0].audio) {
            setAudioUrl(firstWordData.phonetics[0].audio);
          }
        }

        setIsLoading(false);
      } catch (err) {
        // Hantera fel
        setIsLoading(false);
        setError(err.message);
      }
    };
    // Anropa fetchData
    fetchData();
  }, [searchQuery]);

  // Rendera komponenter och innehåll
  return (
    <div className="container">
      <h1 className="title">Welcome to Dictionary App</h1>
      <Searchbar setSearchQuery={setSearchQuery} />
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

// Exportera App-komponenten för användning i andra delar av applikationen
export default App;
