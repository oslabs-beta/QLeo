import React, { useState } from 'react';

function QueryInput({ setQuery }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) =>{
    setQuery(text);
  };

  return (
    <div>
      <p>Query Input</p>
      <textarea 
        type="text" 
        name="query" 
        placeholder='Write your GraphQL query here...' 
        onChange={handleChange}
      />
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QueryInput;