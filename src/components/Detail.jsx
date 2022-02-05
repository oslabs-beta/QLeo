import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Dropdown from './Dropdown';

function Detail({ query }) {
  const [ metrics, setMetrics] = useState({});

  const queryObj = query !== '' ? gql`${query}` : '';
  
  const { loading, error, data } = useQuery(queryObj, {
    onCompleted: (data) => {
      setMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error}</p>;
  }
  console.log(metrics);

  return (
    <div className="detail-container">
      <div className="query-time">Query Response Time: {metrics.queryTime}</div>
      <div className="resolver-breakdown">Resolver Breakdown:</div>
      <Dropdown obj={metrics} indent={1} />
    </div>
  );

}

export default Detail;