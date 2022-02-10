import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import QueryInput from '../components/QueryInput';
import Detail from '../components/Detail';
import Schema from '../components/Schema';
import GraphData from '../components/GraphData';

function MainContainer({query, metrics, setQuery, setMetrics}) {
  return (
    <div className="container w-full mx-auto p-5 flex justify-center flex-grow mt-1 bg-navy">
      <Schema />
      <QueryInput 
        setQuery={setQuery}
        query={query}
      />
      <div className='w-full'>
        {
          query ? <Detail query={query} setGlobalMetrics={setMetrics}/> : <p className="text-center">No results to display</p>
        }
      </div>
    </div>
  );
}

export default MainContainer;