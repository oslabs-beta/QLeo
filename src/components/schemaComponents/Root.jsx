import React, { useState } from 'react';

function Root({setIsRoot, setReqData, setPrev, data}) {

  function clickHandler(e) {
    e.preventDefault();
    if (e.target.innerText === 'Query'){
      // setPrev({prev:prev, typeDef:data.queryType});
      setReqData({...data.queryType, name:'Query'});
    }else if ((e.target.innerText === 'Mutation')){
      setReqData({...data.mutationType, name:'Mutation'});
    }
    setIsRoot(false);
  }

  return (
    <div className="schema-content">
      <div>
        <button onClick={clickHandler}>Query</button>
      </div>
      <div>
        <button onClick={clickHandler}>Mutation</button>
      </div>
    </div>
  );
}

export default Root;