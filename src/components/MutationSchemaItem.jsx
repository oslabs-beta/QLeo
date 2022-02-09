import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';


function MutationItem({ typeDef, setReqData, setPrev, prev, parent }) {
  let isObject = false;  
  let isNonNull = false;
  let isList = false;
  let queryKey;
  let current = typeDef.type;
  while (current !== null ){
    if (current.kind === 'OBJECT') {
      isObject = true;
      queryKey = current.name;
      break;
    }else if (current.kind === 'NON_NULL') isNonNull = true;
    else if (current.kind === 'LIST') isList = true;
    current = current.ofType;
  }
  
  if (isObject){
    let type;
    if (isNonNull && isList) type = `[${typeDef.type.ofType.ofType.name}!]`;
    else if (isNonNull) type = `${typeDef.type.ofType.ofType.name}!`;
    else if (isList) type = `[${typeDef.type.ofType.ofType.name}]`;
    else type = `${typeDef.type.name}`;

    const queryItem = `{
      __type(name: "${queryKey}") {
        name
        fields {
          name
          type {
            name
            kind
            ofType{
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
  
    const { loading, error, data } = useQuery(gql`${queryItem}`);  
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>There was an error: {error}</p>;
    }

    const clickHandler = () => {
      setPrev({prev: prev, typeDef: parent});
      setReqData(data['__type']);
    };

    return (
      <div>
        {<button onClick={clickHandler}>{`${typeDef.name}: ${type}`}</button>}
      </div>
    );
  }
  let tag;
  if (isNonNull) tag = <p>{`${typeDef.name}: ${typeDef.type.ofType.name}!`}</p>;
  else tag = <p>{`${typeDef.name}: ${typeDef.type.name}`}</p>;

  return (
    <div>
      {tag}
    </div>
  );
}

export default MutationItem;