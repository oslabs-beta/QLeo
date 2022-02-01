import React, { useState } from 'react';

function QueryInput() {
  const [ input, setInput ] = useState('');

  const handleChange = (e) => {
    console.log('call handleChange');
  };

  const handleSubmit = () => {};


  return (
    <div>
      <p>Query Input</p>
      <textarea onChange={handleChange}/>
    </div>
  );
}

export default QueryInput;