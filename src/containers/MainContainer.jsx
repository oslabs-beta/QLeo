import React, { useState } from 'react';
import QueryInput from '../components/QueryInput';
import ResolversPerformance from '../components/ResolversPerformance';
import Schema from '../components/Schema';

function MainContainer({schema, query, metrics, setQuery, setMetrics}) {
  const [execRequest, setExecRequest] = useState(false);

  return (
    <div className="w-full flex mt-4">
      <Schema schema={schema} />
      <QueryInput 
        setQuery={setQuery}
        query={query}
        setExecRequest={setExecRequest}
        setMetrics={setMetrics}/>
      <ResolversPerformance 
        query={query} 
        metrics={metrics}
        setMetrics={setMetrics}
        setExecRequest={setExecRequest}
        execRequest={execRequest}/> 
    </div>
  );
}

export default MainContainer;