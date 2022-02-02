import React from 'react';
import { gql, useQuery } from '@apollo/client';

function Display({ query }) {
  return query !== '' ? (
    <div className='display-container'>
      <h1>Display Component</h1>
      <div className="query-time">Query Response Time</div>
      <div className="resolver-breakdown">Resolver Breakdown:</div>
      <Detail query={query} />
    </div>
  ) : (
    <p>No Results to display...</p>
  );
}

function Detail({ query }) {
  const queryObj = gql`${query}`;
  const { loading, error, data } = useQuery(queryObj);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error}</p>;
  }

  return data.species.people.map(person => {
    return (
      <div key={person.id}>{person.name}</div>
    );
  });

}

export default Display;