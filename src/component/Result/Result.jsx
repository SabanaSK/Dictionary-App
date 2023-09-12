import React from "react";

const Result = ({ definition, audioUrl }) => {
  return (
    <div>
      {audioUrl && (
        <div>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {definition && (
        <div>
          {definition.map((def, index) => (
            <div key={def.definition || index}>
              <p>Definition: {def.definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Result;
