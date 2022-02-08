import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';

function QueryInput({ setQuery, setMutation }) {
  const [input, setInput] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (input) {
      const queryStr = input.trim().split(' ')[0];
      setType(queryStr);
    }
  }, [input]);

  const reset = () => {
    setInput('');
    setQuery('');
    setMutation('');
  };

  const handleChange = (value) => {
    setInput(value);
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if (type === 'query') {
      setQuery(input);
    }
    
    if (type === 'mutation') {
      setMutation(input);
    }
  };

  return (
    <div>
      <p>Query Input</p>
      <CodeMirror 
        value={input}
        height='200px'
        name='input'
        onChange={(value) => handleChange(value)}
        theme={oneDark}
        options={{ lineNumbers: true, mode: 'graphql', smartIndent: true, lineWrapping: true }}
      />
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default QueryInput;