import React, { useState } from 'react';
import QueryInput from '../components/QueryInput';
import ResolversPerformance from '../components/ResolversPerformance';
import Schema from '../components/Schema';

function MainContainer({query, metrics, setQuery, setMetrics}) {
  const [execRequest, setExecRequest] = useState(false);

  return (
    <div className="container w-full p-5 m-0 flex justify-between flex-grow text-primary">
      <Schema />
      <QueryInput 
        setQuery={setQuery}
        query={query}
        setExecRequest={setExecRequest}
        setMetrics={setMetrics}
      />
      <div className='w-full'>
        <ResolversPerformance 
          query={query} 
          metrics={metrics}
          setMetrics={setMetrics}
          setExecRequest={setExecRequest}
          execRequest={execRequest}/> 
      </div>
    </div>
  );
}

export default MainContainer;