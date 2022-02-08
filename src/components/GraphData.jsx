import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const state = {
  labels: ['Resolver1', 'Resolver2', 'Resolver3', 'Resolver4', 'Resolver5', 'Resolver6'], //need to make this dynamically render w state
  datasets: [
    {
      label: 'Speed',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [5, 3, 20, 5, 3, 20] //need to make this dynamically render w state
    }
  ]
};

function GraphData({Chart}) {
  return (
    <div>
      <Bar
        data={state}
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
    </div>
  );
}

export default GraphData;