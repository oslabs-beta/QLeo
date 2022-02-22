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
    <div className='input-box w-full'>
      <div className="querybar">
        <div className="querytitle">Query Input</div>
        <div className="query-btn">
          <button type="button" 
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleSubmit}>Submit</button>
          <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={reset}>Reset</button> 
        </div>
      </div>

      <CodeMirror 
        value={input}
        height='40rem'
        width='40em'
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