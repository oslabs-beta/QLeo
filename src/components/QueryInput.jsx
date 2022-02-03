import React, { useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';

import { oneDark } from '@codemirror/theme-one-dark';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';

function QueryInput({ setQuery }) {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    console.log(value);
    setInput(value);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    setQuery(input);
  };


  return (
    <div>
      <p>Query Input</p>
      <CodeMirror 
        value={input}
        height='200px'
        onChange={(value) => handleChange(value)}
        theme={oneDark}
        options={{ lineNumbers: true, mode: 'graphql', smartIndent: true, lineWrapping: true }}
      />
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QueryInput;