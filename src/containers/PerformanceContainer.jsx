import React from 'react';
import GraphData from '../components/GraphData';

function PerformanceContainer({ metrics }) {
  let hasMetrics = false;
  if (Object.keys(metrics).length > 0) hasMetrics = true;
  return (
    <div className="flex justify-center my-10">
      {
        hasMetrics ? <GraphData metrics={metrics}/> 
          : <p className="text-xl">Nothing to see here 👀</p> 
      }
    </div>
  );
}

export default PerformanceContainer;