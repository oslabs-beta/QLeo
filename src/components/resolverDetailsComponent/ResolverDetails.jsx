import React, { useState } from 'react';

const PerofrmanceDetail = ({time, calls}) => {
  return (
    <div>
      <p>Average time: {time.reduce((avg, current, index, arr) =>  (avg + current / arr.length), 0)}</p>
      <p>Calls: {calls}</p>
    </div>
  );
};

const ResolverDetails = ({ obj, resolver }) => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div>
      <p>{resolver} <button onClick={() => setToggle(!toggle)}>{toggle ? 'Hide details' : 'See details'}</button></p>
      
      {toggle && <PerofrmanceDetail time={obj.time} calls={obj.trips}/>}
    </div>
  );
};

export default ResolverDetails;