import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import QueryItem from './schemaComponents/FieldItem';
import Root from './schemaComponents/Root';

const introQuery = gql`
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
    if (reqData.args !== undefined) {
      schemaTypes.push(<h4 key={'arguments'}>Arguments:</h4>);
      reqData.args.forEach((el, index) => schemaTypes.push(<QueryItem key={el.name + index} typeDef={el} setReqData={setReqData} prev={prev} setPrev={setPrev} parent={reqData} />));
    }
    schemaTypes.push(<h4 key={'fields'}>Fields:</h4>);
    reqData.fields.forEach((el, index) => schemaTypes.push(<QueryItem key={el.name + index} typeDef={el} setReqData={setReqData} prev={prev} setPrev={setPrev} parent={reqData} />));
  }

  const backHandler = () => {
    if (prev === null) setIsRoot(true);
    else {
      setReqData(prev.typeDef);
      setPrev(prev.prev);
    }
  };

  let button;
  if (prev) button = `.../ ${prev.typeDef.name} / ${reqData.name}`;
  else if (isRoot) button = '.../ root';
  else button = `.../ root / ${reqData.name}`;


  return (
    <div className="pt-3 pl-3 w-full schema">
      <h1 className="mb-2 font-bold">Schema</h1>
      <button className="text-xs" onClick={backHandler}>{button}</button>
      {isRoot && <Root setIsRoot={setIsRoot} data={data['__schema']} setReqData={setReqData} />}
      {!isRoot && schemaTypes}
    </div>
  );
}

export default Schema;