import React, { useState } from 'react';
import ResolverDetails from './ResolverDetails';

const Dropdown = ({ obj, indent }) => {
  const [toggle, setToggle] = useState(false);

  const newIndent = indent + 1;
  
  return (
    <div>
      {Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object'){
          if (obj[key].time !== undefined){
            return (
              <div key={key} style={{ textIndent: `${indent}em` }}>
                <ResolverDetails obj={obj[key]} resolver={key}/>
              </div>
            );
          }
          return (
            <div key={key} style={{ textIndent: `${indent}em` }}>
              <button onClick={() => setToggle(!toggle)}>{key}</button>
              {toggle && <Dropdown obj={obj[key]} indent={newIndent}/>}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Dropdown;