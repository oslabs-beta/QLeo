import React, { useState } from 'react';
import { render } from 'react-dom';
import {
  Link,
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { gql } from '@apollo/client';
import NavBar from './Navbar';
import MainContainer from '../containers/MainContainer';
import UploadContainer from '../containers/UploadContainer';
import PerformanceContainer from '../containers/PerformanceContainer';

import '../css/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [metrics, setMetrics] = useState({});

  return (
    <div className="bg-bgNavy h-screen">
      <Router>
        <NavBar />

        <Routes>
          <Route path='upload' element={<UploadContainer/>} />
          <Route path='performance' element={<PerformanceContainer metrics={metrics}/>} />
          <Route path='*' element={<MainContainer query={query} metrics={metrics} setQuery={setQuery} setMetrics={setMetrics}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
