import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function GraphData({Chart ,query, metrics}) {
  let chartData;
  const graphTag = [];
  const speed = [];
  // console.log('data', data);
  let currentKeys = Object.keys(metrics);
  let currentObj = metrics;
  if (currentKeys.length > 0) {
    const placeholder = [];
    graphTag.push('Total Time');
    speed.push(metrics.queryTime);

    
    while (currentKeys.length > 0){
      for (let i = 0; i < currentKeys.length; i++){
        if (currentObj[currentKeys[i]].time !== undefined){
          currentObj[currentKeys[i]].time.forEach((el) => {
            graphTag.push(currentKeys[i]);
            speed.push(el);
          });
        }else if (typeof currentObj[currentKeys[i]] === 'object'){
          placeholder.push(currentObj[currentKeys[i]]);
        }
      }
      currentObj = placeholder.shift();
      if (currentObj === undefined) break;
      currentKeys = Object.keys(currentObj);
    }

    console.log(graphTag);
    console.log('length', graphTag.length);
    console.log('last element', graphTag[12]);

    chartData =  {
      labels: graphTag.slice(),
      datasets: [{
        label: 'Speed in ms',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: speed
      }]
    };

    graphTag.push(
      <Bar
        data={chartData}
        options={{
          title:{
            display:true,
            text:'Performance',
            fontSize: 20
          },
          legend: {
            display: true,
            position:'right'
          },
          indexAxis: 'y'
        }}
      />
    );
  } 

  console.log('second chartData', chartData);


  return (
    <div>
      {graphTag}
    </div>
  );
}

export default GraphData;