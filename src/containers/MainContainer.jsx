import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import QueryInput from '../components/QueryInput';
import Detail from '../components/Detail';
import Schema from '../components/Schema';
import GraphData from '../components/GraphData';

function MainContainer({query, metrics, setQuery, setMetrics}) {
//   const [query, setQuery] = useState('');
//   const [metrics, setMetrics] = useState({});
  return (
    <div className="main-container">
      <Schema />
      <QueryInput 
        setQuery={setQuery}
        query={query}
      />
      {/* {
        query ? <GraphData query={gql`${query}`} metrics={metrics}/> 
          : <p>No results to display...</p> 
      } */}
      {
        query ? <Detail query={query} setGlobalMetrics={setMetrics}/> : <p>No results to display</p>
      }
    </div>
  );
}

export default MainContainer;