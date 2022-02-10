import React, { useState } from 'react';
import QueryInput from '../components/QueryInput';
import Detail from '../components/Detail';
import Schema from '../components/Schema';

function MainContainer({query, metrics, setQuery, setMetrics}) {
  const [execRequest, setExecRequest] = useState(false);

  return (
    <div className="container w-full mx-auto p-5 flex justify-center flex-grow mt-1 bg-navy">
      <Schema />
      <QueryInput 
        setQuery={setQuery}
        query={query}
        setExecRequest={setExecRequest}
        setMetrics={setMetrics}
      />
      <div className='w-full'>
        {
          <Detail 
            query={query} 
            metrics={metrics}
            setMetrics={setMetrics}
            setExecRequest={setExecRequest}
            execRequest={execRequest}/> 
        }
      </div>
    </div>
  );
}

export default MainContainer;