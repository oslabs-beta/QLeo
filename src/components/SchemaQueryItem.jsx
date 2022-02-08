import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';


function QueryItem({ typeDef }) {
  if (typeDef.type.kind === 'OBJECT'){
    console.log('what');
    const queryItem = `{
      __type(name: "${typeDef.type.name}") {
        name
        fields {
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
    `;

    const [showDetail, setShowDetail] = useState(false);
    const { loading, error, data } = useQuery(gql`${queryItem}`);  
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>There was an error: {error}</p>;
    }
  
    console.log(data);
    const fields = [];
    if (showDetail){
      data['__type'].fields.forEach((el) => fields.push(<QueryItem typeDef={el}/>));
    }

    return (
      <div>
        {<button onClick={() => setShowDetail(!showDetail)}>{`${typeDef.name}: ${typeDef.type.name}`}</button>}
        {fields}
      </div>
    );
  }else{
    let tag;
    console.log('1');
    if (typeDef.type.kind === 'NON_NULL') tag = <p>{`${typeDef.name}: ${typeDef.type.ofType.name}!`}</p>;
    else tag = <p>{`${typeDef.name}: ${typeDef.type.name}`}</p>;

    return (
      <div>
        {tag}
      </div>
    );
  }
}

export default QueryItem;