import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import Dropdown from './resolverDetailsComponent/Dropdown';


function MutationHook({query, setMetrics, setExecRequest}){
  const  [ mutationFunc , { data, loading , error }] = useMutation(gql`${query}`, {
    onCompleted: data => {
      setExecRequest(false);
      setMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });
    
  useEffect(() => {
    mutationFunc();
  }, []);
  return null;
}

function QueryHook({query, setMetrics, setExecRequest}){
  const { loading, error, data } = useQuery(gql`${query}`, {
    onCompleted: (data) => {
      setExecRequest(false);
      setMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });
  return null;
}

function ResolversPerformance({ query, metrics, execRequest, setMetrics, setExecRequest }) {
  let isQuery = false, isMutation = false;
  
  if (execRequest && query.trim().substring(0,8) === 'mutation') isMutation = true;
  else if (execRequest && query.trim().substring(0,5) === 'query') isQuery = true;

  return (
    <div className="detail-container">
      <p className = "font-bold text-lg mb-2">GraphQL Performance Details:</p>
      {isQuery ? <QueryHook query={query} setMetrics={setMetrics} setExecRequest={setExecRequest}/> 
        : isMutation ? <MutationHook query={query} setMetrics={setMetrics} setExecRequest={setExecRequest}/> 
          : <></>}
      <div className="font-semibold ml-5">
        <p>Query Response Time</p>
        <p>{metrics.queryTime || 'N/A'}</p>
      </div>
      <div className="font-semibold ml-5">Resolver Breakdown:</div>
      <Dropdown obj={metrics} indent={1} />
    </div>
  );
}

export default ResolversPerformance;