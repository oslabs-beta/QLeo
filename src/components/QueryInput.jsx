import React, { useEffect, useState } from 'react';


import CodeMirror from '@uiw/react-codemirror';
// import { ValidationContext, SDLValidationContext } from 'graphql';
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
    <div className="w-2/5 mx-5 my-6">
      <div className="flex justify-between items-center pb-2">
        <div className="font-bold text-lg">Query Input</div>
        <div>
          <button type="button" 
            className="px-6 py-2 mr-3 text-sm tracking-wide rounded border border-btn-gray hover:bg-btn-gray"
            onClick={reset}>Reset</button> 
          <button type="button" 
            className="px-6 py-2 text-sm tracking-wide rounded border border-primary hover:bg-primary"
            onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <CodeMirror 
        value={input}
        height='40rem'
        width='100%'
        name='input'
        onChange={(value) => handleChange(value)}
        theme={oneDark}
        options={{ 
          lineNumbers: true, 
          mode: 'graphql', 
          lint: {
            validationRules: []
          },
          smartIndent: true, 
          lineWrapping: true }}
      />
  
    </div>
  );
}

export default QueryInput;