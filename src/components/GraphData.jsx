import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function GraphData({Chart ,query, metrics}) {
  let chartData;
  const graphTag = [];
  let keys, speed;
  // console.log('data', data);
  if (Object.keys(metrics).length > 0) {
    console.log('metrics',  metrics);


    keys = Object.keys(metrics.Query.Species).filter((el)=>{
      if (metrics.Query.Species[el].time !== undefined) return true;
      else return false;
    });
    
    console.log('keys', keys);
  
    speed = keys.map((el) => metrics.Query.Species[el].time[0]);
    console.log('speed', speed);
  

    chartData =  {
      labels: keys,
      datasets: [{
        label: 'Speed in ms',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: speed
      }]
    };

    console.log('first chartData', chartData);

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