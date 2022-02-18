import React, { useState } from 'react';
import {
  Link,
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NavBar from './Navbar';
import MainContainer from '../containers/MainContainer';
import UploadContainer from '../containers/UploadContainer';
import PerformanceContainer from '../containers/PerformanceContainer';

import '../css/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [metrics, setMetrics] = useState({});

  return (
    <div className="app h-screen bg-black">
      <Router>
        <NavBar />

        <Routes>
          <Route path='performance' element={<PerformanceContainer metrics={metrics}/>} />
          <Route path='dashboard' element={<MainContainer query={query} metrics={metrics} setQuery={setQuery} setMetrics={setMetrics}/>} />
          <Route path='*' element={<UploadContainer/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
