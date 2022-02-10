import React, { useState } from 'react';


import CodeMirror from '@uiw/react-codemirror';
import { ValidationContext, SDLValidationContext } from 'graphql';
import { oneDark } from '@codemirror/theme-one-dark';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
require('codemirror/mode/markdown/markdown');

function QueryInput({ query, setQuery, setExecRequest, setMetrics}) {
  const [input, setInput] = useState(query);

  const reset = () => {
    setInput('');
    setQuery('');
    setMetrics({});
  };

  const handleChange = (value) => {
    setInput(value);
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    setExecRequest(true);
    setQuery(input);
  };

  return (
    <div className='input-box'>
      <p>Query Input</p>
      <CodeMirror 
        value={input}
        height='30rem'
        name='input'
        width='20rem'
        onChange={(value) => handleChange(value)}
        theme={oneDark}
        options={{ 
          theme: 'monokai',
          lineNumbers: true, 
          mode: 'graphql', 
          lint: {
            validationRules: []
          },
          smartIndent: true, 
          lineWrapping: true }}
      />
      <button className='submit-btn' onClick={handleSubmit}>Submit </button>
      <button className='submit-btn' onClick={reset}>Reset </button>
    </div>
  );
}

export default QueryInput;