import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import QueryItem from './SchemaQueryItem';
import MutationItem from './MutationSchemaItem';

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
          args{
              name
              type{
                  name
                  kind
                  ofType{
                      name
                      kind
                  }
              }
          }
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
  const [isRoot, setIsRoot] = useState(true);
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
  data['__schema'].mutationType.fields.forEach((el) => mutationTypes.push(<MutationItem typeDef={el}/>));

  const rootTags = <div><h2>root query </h2> 
    <button onClick={() => {
      setIsRoot(false);
      setShowQuery(!showQuery);}}>Query</button>
    <button onClick={() => {
      setIsRoot(false);
      setShowMutation(!showMutation);}}>Mutation</button>
  </div>;

  return (
    <div className="schema">
      <h1>Schema</h1>
      {isRoot && rootTags}
      { showQuery && queryTypes}
      { showMutation && mutationTypes}
    </div>
  );
}

export default Schema;