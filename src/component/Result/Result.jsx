import React from "react";
import styles from "./Result.module.css";

// Result-komponenten tar in "definition" och "audioUrl" som props
const Result = ({ definition, audioUrl }) => {
  return (
    <div className={styles.resultContainer}>
      {/* Om det finns en ljud-URL, rendera en ljudspelare */}
      {audioUrl && (
        <div>
          <audio data-testid="audio" controls>
            <source data-testid="source" src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Om det finns en definition, rendera den */}
      {definition && (
        <div data-testid="definition">
          {definition.map((meaning, index) => (
            <div key={index}>
              {/* Visa ord om den finns */}
              {meaning.partOfSpeech && <p>Part of Speech: {meaning.partOfSpeech}</p>}
              {/* Loopa igenom varje definition i "meaning" */}
              {meaning.definitions.map((def, i) => (
                <div key={i} className={styles.listContainer}>
                  {/* Visa innehåll om den finns */}
                  <p>Definition: {def.definition}</p>
                  {def.example && <p>Example: {def.example}</p>}
                  {def.synonyms && <p>Synonyms: {def.synonyms}</p>}
                  {def.antonyms && <p>Antonyms: {def.antonyms}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Result;
