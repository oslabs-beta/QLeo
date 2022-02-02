import React from 'react';
import { gql, useQuery } from '@apollo/client';

function Display({query, setQuery, loading, error, data}) {

  const renderData = () => {
    return data.species.people.map(person => {
      return (
        <div key={person.id}>{person.name}</div>
      );
    });
  };

  return (
    <div>
      <h1>Display Component</h1>
      <div className="queryTime">Query Response Time</div>

      <div className="resolverBreakdown">Resolver Breakdown:</div>
      <div className="output"></div>
    </div>
  );
}

export default Display;