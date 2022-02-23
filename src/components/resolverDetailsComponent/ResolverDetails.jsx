import React, { useState } from 'react';

const PerformanceDetail = ({time, calls}) => {
  return (
    <div className="py-1 text-sm">
      <p>Average time: {time.reduce((avg, current, index, arr) =>  (avg + current / arr.length), 0)}</p>
      <p>Calls: {calls}</p>
    </div>
  );
};

const ResolverDetails = ({ obj, resolver }) => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between"> 
        <div>{resolver}</div>
        <button className="text-link hover:text-link-hover text-sm" onClick={() => setToggle(!toggle)}>{toggle ? 'Hide details' : 'Show details'}</button>
      </div>
      
      {toggle && <PerformanceDetail time={obj.time} calls={obj.trips}/>}
    </div>
  );
};

export default ResolverDetails;