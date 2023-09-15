import React from "react";
import styles from "./Result.module.css";

const Result = ({ definition, audioUrl }) => {
  return (
    <div className={styles.resultContainer}>
      {audioUrl && (
        <div>
          <audio data-testid="audio" controls>
            <source data-testid="source" src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {definition && (
        <div data-testid="definition">
          {definition.map((meaning, index) => (
            <div key={index}>
              {meaning.partOfSpeech && <p>Part of Speech: {meaning.partOfSpeech}</p>}
              {meaning.definitions.map((def, i) => (
                <div key={i} className={styles.listContainer}>
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
