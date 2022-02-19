import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

function GraphData({ metrics }) {
  const graphTag = [];
  const speed = [];
  const calls = [];
  const totalTime = metrics.queryTime;
  
  let currentKeys = Object.keys(metrics);
  let currentObj = metrics;

  if (currentKeys.length > 0) {
    const placeholder = [];
    graphTag.push('Total Time');

    while (currentKeys.length > 0){
      for (let i = 0; i < currentKeys.length; i++){
        if (currentObj[currentKeys[i]].trips) {
          console.log(currentObj[currentKeys[i]]);
          calls.push({ label: currentKeys[i], calls: currentObj[currentKeys[i]].trips });
        }

        if (currentObj[currentKeys[i]].time !== undefined){
          currentObj[currentKeys[i]].time.forEach((el) => {
            graphTag.push(currentKeys[i]);
            let time = el;

            if (Math.ceil(el) <= 1) {
              time = 1.0;
            }
            speed.push({ time: time, label: currentKeys[i] });
          });
        } else if (typeof currentObj[currentKeys[i]] === 'object'){
          placeholder.push(currentObj[currentKeys[i]]);
        }
      }
      currentObj = placeholder.shift();
      if (currentObj === undefined) break;
      currentKeys = Object.keys(currentObj);
    }

    console.log('graphTag', graphTag);

    const speedData =  {
      labels: speed.map(item => item.label),
      datasets: [{
        label: 'Speed in ms',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: speed.map(item => item.time),
      }]
    };

    console.log(speedData);

    const callsData = {
      labels: calls.map(item => item.label),
      datasets: [{
        label: 'Resolver Calls',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: calls.map(item => item.calls)
      }]
    };

    console.log('speed', speed);
    console.log('calls', calls);

    const totalCalls = calls.reduce((acc, item) => {
      acc += item.calls;
      return acc;
    }, 0);

    return (
      <div className="">
        <p>Total execution time(ms): {totalTime}</p>
        <p>Total Resolver invocations: {totalCalls}</p>

        <div className="flex m-4">
          <div className="w-1/2 m-2">
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
          <div className="w-1/2">
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
      </div>
    );
  }}

export default GraphData;