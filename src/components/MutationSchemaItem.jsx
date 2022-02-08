import React, { useState } from 'react';
import QueryItem from './SchemaQueryItem';


function MutationItem({ typeDef }) {
  const [showDetail, setShowDetail] = useState(false);
  
  const args = [];
  const fields = [];
  if (showDetail){
    typeDef.args.forEach((el) => args.push(<QueryItem typeDef={el}/>));
    fields.push(<QueryItem typeDef={{...typeDef, name:typeDef.type.name}}/>);
  }
  const argTag = <div><p>Arguments</p>{args}</div>;
  const fieldTag = <div><p>Fields</p>{fields}</div>;

  return (
    <div>
      {<button onClick={() => setShowDetail(!showDetail)}>{`${typeDef.name}: ${typeDef.type.name}`}</button>}
      {showDetail && argTag}
      {showDetail && fieldTag}
    </div>
  );
}

export default MutationItem;