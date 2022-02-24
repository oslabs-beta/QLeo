import React, { useState } from 'react';
import QueryInput from '../components/QueryInput';
import ResolversPerformance from '../components/ResolversPerformance';
import Schema from '../components/Schema';

function MainContainer({schema, query, metrics, setQuery, setMetrics, history, setHistory}) {
  const [execRequest, setExecRequest] = useState(false);

  return (
    <div className="w-full flex mt-4">
      {schema ? <Schema/> 
        : <p className="w-1/5 mx-10 my-6">Please upload a schema 🧐</p>}
      <QueryInput 
        setQuery={setQuery}
        query={query}
        setExecRequest={setExecRequest}
        setMetrics={setMetrics}
      />
      <ResolversPerformance 
        query={query} 
        metrics={metrics}
        setMetrics={setMetrics}
        setExecRequest={setExecRequest}
        execRequest={execRequest}
        history={history}
        setHistory={setHistory}
      /> 
    </div>
  );
}

export default MainContainer;