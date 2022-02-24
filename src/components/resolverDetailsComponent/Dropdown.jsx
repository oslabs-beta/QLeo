import React, { useState } from 'react';
import ResolverDetails from './ResolverDetails';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = ({ obj, indent }) => {
  const [toggle, setToggle] = useState(false);

  const newIndent = indent + 0.75;
  
  return (
    <div className='overflow-auto'>
      {Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object'){
          if (obj[key].time !== undefined){
            return (
              <div key={key} style={{ textIndent: `${indent}em` }} className="p-1.5 border-t border-b border-bg-gray">
                <ResolverDetails obj={obj[key]} resolver={key}/>
              </div>
            );
          }
          return (
            <div key={key} className="pl-1.5 overflow-scroll">
              <div className='overflow-scroll'>
                <button className="w-full py-1.5 flex justify-between items-center" onClick={() => setToggle(!toggle)}>
                  <p style={{ textIndent: `${indent}em` }}>{key}</p>
                  <FontAwesomeIcon icon={toggle ? faChevronUp : faChevronDown } />
                </button>
              </div>
              
              {toggle && <Dropdown obj={obj[key]} indent={newIndent}/>}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Dropdown;