import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import Dropdown from './resolverDetailsComponent/Dropdown';


function MutationHook({query, setMetrics, setExecRequest, history, setHistory}){
  const  [ mutationFunc , { data, loading , error }] = useMutation(gql`${query}`, {
    onCompleted: data => {
      setExecRequest(false);
      setMetrics(data.extensions.performanceData);
      setHistory(history.push({query:query, metrics:data.extensions.performanceData}));
    },
    fetchPolicy: 'no-cache'
  });
    
  useEffect(() => {
    mutationFunc();
  }, []);
  return null;
}

function QueryHook({query, setMetrics, setExecRequest, history, setHistory}){
  const { loading, error, data } = useQuery(gql`${query}`, {
    onCompleted: (data) => {
      setExecRequest(false);
      setMetrics(data.extensions.performanceData);
      // history.push({query:query, metrics:data.extensions.performanceData});
      // const newArray = history.slice();
      setHistory([...history, {query:query, metrics:data.extensions.performanceData}]);
    },
    fetchPolicy: 'no-cache'
  });
  return null;
}

function ResolversPerformance({ query, metrics, execRequest, setMetrics, setExecRequest, history, setHistory }) {
  let isQuery = false, isMutation = false;
  
  if (execRequest && query.trim().substring(0,8) === 'mutation') isMutation = true;
  else if (execRequest && query.trim().substring(0,5) === 'query') isQuery = true;

  return (
    <div className="w-2/5 ml-5 mr-10 my-6">
      <p className = "font-bold text-lg pb-4">GraphQL Performance Details</p>
      {isQuery ? <QueryHook query={query} setMetrics={setMetrics} setExecRequest={setExecRequest} history={history} setHistory={setHistory}/> 
        : isMutation ? <MutationHook query={query} setMetrics={setMetrics} setExecRequest={setExecRequest} history={history} setHistory={setHistory}/> 
          : <></>}
      <div className="p-4 bg-gradient-to-r from-left to-right rounded-lg">
        <p className = "mb-1 text-xs uppercase tracking-widest">Query Response Time</p>
        <p>{metrics.queryTime ? metrics.queryTime + 'ms' : '...'}</p>
      </div>
      <div className="mt-6 pb-4 border-b border-bg-mirror">
        <p className="text-xs uppercase tracking-widest">Resolver Breakdown</p>
      </div>
      <div className="overflow-scroll h-3/5">
        <Dropdown obj={metrics} indent={0}/>
      </div>
    </div>
  );
}

export default ResolversPerformance;