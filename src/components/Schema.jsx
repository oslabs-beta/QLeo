import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import QueryItem from './FieldItem';
import MutationItem from './MutationSchemaItem';
import Root from './schemaComponents/Root';

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
            ofType{
              name
              kind
            }
          }
        }
      }
    }
    mutationType {
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
                    ofType{
                      name
                      kind
                  }
                }
            }
        }
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
}
`;

function Schema() {
  const [isRoot, setIsRoot] = useState(true);
  const [prev, setPrev] = useState(null);
  const [reqData, setReqData] = useState({});
  const { loading, error, data } = useQuery(introQuery);  


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {JSON.stringify(error)}</p>;
  }
  
  const schemaTypes = [];
  if (Object.keys(reqData).length > 0) {
    schemaTypes.push(<h4>{reqData.name}</h4>);
    if (reqData.args !== undefined){
      schemaTypes.push(<h4>Arguments:</h4>);
      console.log('args',reqData.args);
      reqData.args.forEach((el) => schemaTypes.push(<QueryItem typeDef={el} setReqData={setReqData} prev={prev} setPrev={setPrev} parent={reqData}/>));
    } 
    schemaTypes.push(<h4>Fields:</h4>);
    reqData.fields.forEach((el) => schemaTypes.push(<QueryItem typeDef={el} setReqData={setReqData} prev={prev} setPrev={setPrev} parent={reqData}/>));
  }

  console.log(reqData);
  const backHandler = () =>{
    if (prev === null) setIsRoot(true);
    else {
      setReqData(prev.typeDef);
      setPrev(prev.prev);
    }
  };

  return (
    <div className="pt-3 pl-3 w-80">
      <h1>Schema <button className="text-xs" onClick={backHandler}>Back</button></h1>
      {isRoot && <Root setIsRoot={setIsRoot} data={data['__schema']} setReqData={setReqData}/>}
      {!isRoot && schemaTypes}
    </div>
  );
}

export default Schema;