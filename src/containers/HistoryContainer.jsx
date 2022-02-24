import React, { useState } from 'react';
import HistoryItem from '../components/HistoryItem';

function HistoryContinaer({history, setMetrics, setQuery}) {
  const historyItem = [];
  if (history.length > 0) history.forEach((el, index) => {
    historyItem.push(<HistoryItem key={index} metrics={el.metrics} query={el.query} setQuery={setQuery} setMetrics={setMetrics} index={index}/>);
  });

  return (
    <div className="w-full flex mt-4 flex flex-col justify-center">
      {historyItem}
    </div>
  );
}

export default HistoryContinaer;