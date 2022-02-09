import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Dropdown from './Dropdown';

function Mutation({ mutation }) {
  const [ metrics, setMetrics] = useState({});
  const [ mutationFunc , { data, loading , error }] = useMutation(mutation, {
    onCompleted: data => {
      setMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    mutationFunc();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error}</p>;
  }

  return (
    <div className="detail-container">
      <div className="query-time">Query Response Time: {metrics.queryTime}</div>
      <div className="resolver-breakdown">Resolver Breakdown:</div>
      <Dropdown obj={metrics} indent={1} />
    </div>
  );
}

export default Mutation;