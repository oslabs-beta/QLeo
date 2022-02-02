import React, { useState } from 'react';

function QueryInput({ setQuery }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();

    setInput(e.target.value);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();

    setQuery(input);
  };

  return (
    <div>
      <p>Query Input</p>
      <textarea 
        type="text" 
        name="input"
        value={input}
        placeholder='Write your GraphQL query here...' 
        onChange={handleChange}
      />
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QueryInput;