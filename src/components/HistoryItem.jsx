import React, { useState } from 'react';

function HistoryItem({metrics, query, setQuery, setMetrics, index}) {
  function onclickHandler(){
    setQuery(query);
    setMetrics(metrics); 
  }

  return (
    <div className="flex mt-4 place-self-center">
      <div className="py-5 px-10 bg-gradient-to-r from-left to-right rounded-lg">
        <button className="mb-1 text-xs uppercase tracking-widest" onClick={onclickHandler}>Query {index + 1}</button>
      </div>
    </div>
  );
}

export default HistoryItem;