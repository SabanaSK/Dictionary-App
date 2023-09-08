import React from "react";

const Result = ({ definition }) => {
console.log("def", definition);
  if(!definition) {
  return <div>No definition available</div>
}

  return (
    <div>
     {definition && (
  <div>
    {definition.map((def, index) => (
      <div key={index}>
        <p>Definition: {def.definition}</p>
      </div>
    ))}
  </div>
)}
    </div>
  )
};

export default Result;