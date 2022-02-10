import React, { useState, useEffect } from 'react';
import GraphData from '../components/GraphData';

function UploadContainer({ query, metrics }) {
  return (
    <div className="performance-container">
      {
        query ? <GraphData metrics={metrics}/> 
          : <p>No results to display...</p> 
      }
    </div>
  );
}

export default UploadContainer;