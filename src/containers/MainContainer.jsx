import React, { useState } from 'react';
import QueryInput from '../components/QueryInput';
import Detail from '../components/Detail';
import Schema from '../components/Schema';

function MainContainer({query, metrics, setQuery, setMetrics}) {
  const [execRequest, setExecRequest] = useState(false);

  return (
    <div className="main-container">
      <Schema />
      <QueryInput 
        setQuery={setQuery}
        query={query}
        setExecRequest={setExecRequest}
        setMetrics={setMetrics}
      />
      {
        <Detail 
          query={query} 
          metrics={metrics}
          setMetrics={setMetrics}
          setExecRequest={setExecRequest}
          execRequest={execRequest}/> 
      }
    </div>
  );
}

export default MainContainer;