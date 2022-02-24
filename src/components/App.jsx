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
import HistoryContinaer from '../containers/HistoryContainer';

import '../css/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [metrics, setMetrics] = useState({});
  const [schema, setSchema] = useState(false);
  const [history, setHistory] = useState([]);

  return (
    <div className="h-screen bg-black text-text-primary">
      <Router>
        <NavBar />

        <Routes>
          <Route path='performance' element={<PerformanceContainer metrics={metrics}/>} />
          <Route path='dashboard' element={<MainContainer query={query} metrics={metrics} setQuery={setQuery} setMetrics={setMetrics} schema={schema} history={history} setHistory={setHistory}/>} />
          <Route path='history' element={<HistoryContinaer history={history} setMetrics={setMetrics} setQuery={setQuery}/>} />
          <Route path='*' element={<UploadContainer schema={schema} setSchema={setSchema}/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
