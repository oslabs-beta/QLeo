import React from 'react';
import Display from './Display';
import QueryInput from './QueryInput';

import '../assets/css/App.css';

function App() {
  return (
    <div>
      <h1>QLEO</h1>
      <QueryInput />
      <Display />
    </div>
  );
}

export default App;
