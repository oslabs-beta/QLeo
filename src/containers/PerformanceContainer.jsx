import React from 'react';
import GraphData from '../components/GraphData';

function PerformanceContainer({ metrics }) {
  let hasMetrics = false;
  if (Object.keys(metrics).length > 0) hasMetrics = true;
  return (
    <div className="performance-container">
      {
        hasMetrics ? <GraphData metrics={metrics}/> 
          : <p>No results to display...</p> 
      }
    </div>
  );
}

export default PerformanceContainer;