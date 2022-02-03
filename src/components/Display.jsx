import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

function Display({ query }) {
  const [time, setTime] = useState();

  return query !== '' ? (
    <div className='display-container'>
      <h1>Display Component</h1>
      <div className="query-time">Query Response Time: {time}</div>
      <div className="resolver-breakdown">Resolver Breakdown:</div>
      <Detail query={query} setTime={setTime} />
    </div>
  ) : (
    <p>No Results to display...</p>
  );
}

function Detail({ query, setTime }) {
  const queryObj = gql`${query}`;

  const t0 = performance.now();

  const { loading, error, data } = useQuery(queryObj, {
    onCompleted: data => {
      const t1 = performance.now();
      setTime(t1 - t0);
      console.log(`Call to query took ${t1 - t0} milliseconds.`); 
    },
    fetchPolicy: 'no-cache'
  });  

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