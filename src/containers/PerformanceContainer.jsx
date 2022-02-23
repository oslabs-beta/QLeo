import React from 'react';
import GraphData from '../components/GraphData';

function PerformanceContainer({ metrics }) {
  let hasMetrics = false;
  if (Object.keys(metrics).length > 0) hasMetrics = true;
  return (
    <div className="my-10">
      {
        hasMetrics ? <GraphData metrics={metrics}/> 
          : <p className="flex justify-center text-xl">Nothing to see here 👀</p> 
      }
    </div>
  );
}

export default PerformanceContainer;