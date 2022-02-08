import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import Dropdown from './Dropdown';

function Detail({ query }) {
  const [ metrics, setMetrics] = useState({});
  let data, loading, error, mutationFunc;
  
  if (query.trim().substring(0,8) === 'mutation'){
    [ mutationFunc , { data, loading , error }] = useMutation(gql`${query}`, {
      onCompleted: data => {
        setMetrics(data.extensions.performanceData);
      },
      fetchPolicy: 'no-cache'
    });
    
    useEffect(() => {
      mutationFunc();
    }, []);

  }else if (query.trim().substring(0,5) === 'query'){
    [{ loading, error, data }] = [useQuery(gql`${query}`, {
      onCompleted: (data) => {
        setMetrics(data.extensions.performanceData);
      },
      fetchPolicy: 'no-cache'
    })];
  }

  
  console.log(loading);
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

export default Detail;