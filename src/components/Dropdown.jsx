import React, { useState } from 'react';

const Dropdown = ({ obj, indent }) => {
  if (typeof obj !== 'object') return <p>{obj}</p>;
  
  return (
    <>
      {Object.keys(obj).map(key => {
        const [toggle, setToggle] = useState(false);

        if (typeof obj[key] !== 'object') {
          return (
            <div key={key}>
              <p>{key}: {obj[key]}</p>
            </div>
          );
        }

        return (
          <div key={key} style={{ textIndent: `${indent}em` }}>
            <button onClick={() => setToggle(!toggle)}>{key}</button>
            {toggle && <Dropdown obj={obj[key]} indent={++indent} />}
          </div>
        );
      })}
    </>
  );
};

export default Dropdown;