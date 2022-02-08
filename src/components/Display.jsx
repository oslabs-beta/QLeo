import React, { useState } from 'react';
import Detail from './Detail';

function Display({ query }) {
  const [time, setTime] = useState();

  return query !== '' ? (
    <div className='display-container'>
      <h1>Display Component</h1>
      <div className="query-time">Query Response Time: {time}</div>
      <br></br>
      <div className="resolver-breakdown">Resolver Breakdown:</div>
      <Detail query={query} setTime={setTime} />
    </div>
  ) : (
    <p>No Results to display...</p>
  );
}

export default Display;