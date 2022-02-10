import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import QueryInput from '../components/QueryInput';
import Detail from '../components/Detail';
import Schema from '../components/Schema';
import GraphData from '../components/GraphData';

function mainContainer({ query, setGlobalMetrics }) {
  
  return (
    <div className="main">
      <Schema />
      <FileUpload />
      <QueryInput 
        setQuery={setQuery}
      />
      {
        query ? <GraphData query={gql`${query}`} metrics={metrics}/> 
          : <p>No results to display...</p> 
      }
      <p>GraphQL performance details</p>
      {
        query ? <Detail query={query} setGlobalMetrics={setMetrics}/> : <p>No results to display</p>
      }
    </div>
  );
}

export default mainContainer;