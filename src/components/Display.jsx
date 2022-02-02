import React from 'react';
import { gql, useQuery } from '@apollo/client';

function Display({ query }) {
  const names = [];
  if (query !== ''){
    names.push(<Detail query={query}/>);
  }

  return (
    <div>
      <h1>Display Component</h1>
      <div className="queryTime">Query Response Time</div>
      <div className="resolverBreakdown">Resolver Breakdown:</div>
      <div className="output">{names}</div>
    </div>
  );
}

function Detail({ query }) {
  const queryObj = gql`${query}`;
  const { loading, error, data } = useQuery(queryObj);

  if (error || loading) {
    return null;
  }

  return data.species.people.map(person => {
    return (
      <div key={person.id}>{person.name}</div>
    );
  });

}

export default Display;