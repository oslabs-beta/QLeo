import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

function Detail({ query, setTime }) {
  const [ metrics, setMetrics] = useState({});
  const queryObj = gql`${query}`;

  const { loading, error, data } = useQuery(queryObj, {
    onCompleted: (data) => {
      setMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error}</p>;
  }

  const DropDown = ({ obj, indent }) => {
    if (typeof obj !== 'object') return <p>{obj}</p>;
    
    return (
      <>
        {Object.keys(obj).map(key => {
          const [toggle, setToggle] = useState(false);
          if (typeof obj[key] !== 'object') {
            return (
              <div>
                <p>{key}: {obj[key]}</p>
              </div>
            );
          }

          return (
            <div key={key} style={{ textIndent: `${indent}em` }}>
              <button onClick={() => setToggle(prev => !prev)}>{key}</button>
              {toggle && <DropDown obj={obj[key]} indent={++indent} />}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="detail-container">
      <DropDown obj={metrics} indent={1} />
    </div>
  );

}

export default Detail;