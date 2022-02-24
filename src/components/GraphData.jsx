import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

function GraphData({ metrics }) {
  const calls = [];
  const totalTime = metrics.queryTime;
  
  let currentKeys = Object.keys(metrics);
  let currentObj = metrics;

  if (currentKeys.length > 0) {
    const placeholder = [];

    while (currentKeys.length > 0){
      for (let i = 0; i < currentKeys.length; i++){
        if (currentObj[currentKeys[i]].trips) {
          
          const time = currentObj[currentKeys[i]].time.reduce((avg, current, _index, arr) =>  (avg + current / arr.length), 0);

          calls.push({ label: currentKeys[i], calls: currentObj[currentKeys[i]].trips, time: time });
        }

        if (typeof currentObj[currentKeys[i]] === 'object') {
          placeholder.push(currentObj[currentKeys[i]]);
        }        
      }

      currentObj = placeholder.shift();
      if (currentObj === undefined) break;
      currentKeys = Object.keys(currentObj);
    }

    const speedData =  {
      labels: calls.map(item => item.label),
      datasets: [{
        label: 'Speed in ms',
        backgroundColor: 'rgba(193,199,205, 1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(202,160,85,1)',
        data: calls.map(item => item.time),
      }]
    };


    const callsData = {
      labels: calls.map(item => item.label),
      datasets: [{
        label: 'Resolver Calls',
        backgroundColor: 'rgba(193,199,205, 1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(202,160,85,1)',
        data: calls.map(item => item.calls)
      }]
    };

    const totalCalls = calls.reduce((acc, item) => {
      acc += item.calls;
      return acc;
    }, 0);

    return (
      <div className="flex flex-col pb-8 mb-8 items-center">
        <div className="w-2/5 m-2 flex flex-col items-center">
          <p>Total execution time(ms): {totalTime}</p>
          <Bar
            data={speedData}
            options={{
              title: {
                display: true,
                text: 'Performance',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              },
              indexAxis: 'y'
            }} />
        </div>
        <div className="w-2/5 flex flex-col items-center">
          <p>Total Resolver invocations: {totalCalls}</p>
          <Bar
            data={callsData}
            options={{
              title: {
                display: true,
                text: 'Performance',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              },
              indexAxis: 'y'
            }} />
        </div>
      </div>
    );
  }}

export default GraphData;