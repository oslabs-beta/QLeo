import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import QueryItem from './SchemaQueryItem';

const introQuery = gql `
  {
    __schema {
      queryType{
        fields{
          name
          type {
            name
            kind
            ofType{
              name
              kind
            }
          }
        }
      }
      mutationType{
        fields{
          name
          type {
            name
            kind
            ofType{
              name
              kind
            }
          }
        }
      }
    }
  }
`;

function Schema() {
  const [showQuery, setShowQuery] = useState(false);
  const [showMutation, setShowMutation] = useState(false);
  const { loading, error, data } = useQuery(introQuery);  


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {JSON.stringify(error)}</p>;
  }
  
  const queryTypes = [];
  data['__schema'].queryType.fields.forEach((el) => queryTypes.push(<QueryItem typeDef={el}/>));

  const mutationTypes = [];
  data['__schema'].mutationType.fields.forEach((el) => mutationTypes.push(<QueryItem typeDef={el}/>));

  return (
    <div className="schema">
      <h1>Schema</h1>
      <h2>root query </h2>
      <button onClick={() => setShowQuery(!showQuery)}>Query</button>
      { showQuery && queryTypes}
      <button onClick={() => setShowMutation(!showMutation)}>Mutation</button>
      { showMutation && mutationTypes}
    </div>
  );
}

export default Schema;