import { useEffect, useState } from "react";

import Searchbar from "./component/Search/Searchbar";
import Result from "./component/Result/Result";
import AudioPlayer from "./component/AudioPlayer/AudioPlayer";

function App() {
  const [words, setWords] = useState("");
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    if (!words) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${words}`
      );
      const data = await res.json();
      const firstWordData = data[0];
      const allDefinitions = firstWordData.meanings
        .map((meaning) => meaning.definitions)
        .flat();
      setDefinition(allDefinitions);
    };

    fetchData();
  }, [words]);

  return (
    <div>
      <h1>Welcome to Dictionary App</h1>
      <Searchbar setWords={setWords} />
      <Result definition={definition} />
      <AudioPlayer />
    </div>
  );
}

export default App;
