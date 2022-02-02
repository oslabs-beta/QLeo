import React from 'react';

function QueryInput({ handleChange, handleSubmit, query }) {
  return (
    <div>
      <p>Query Input</p>
      <textarea 
        type="text" 
        name="query" 
        value={query}
        placeholder='Write your GraphQL query here...' 
        onChange={handleChange}
      />
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QueryInput;