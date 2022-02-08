import React from 'react';
import { gql, useQuery } from '@apollo/client';

const introQuery = gql `
  {
    __schema {
      queryType{
        fields{
          name
        }
      }
      mutationType{
        fields{
          name
        }
      }
    }
  }
`;

function Schema() {
  const { loading, error, data } = useQuery(introQuery);  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error}</p>;
  }
  console.log(data);

  return (
    <div className="schema">
      <h1>schemamamaaa column</h1>
      <h2>root query </h2>
    </div>
  );
}

export default Schema;