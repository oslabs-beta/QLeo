import React, { useState } from 'react';

function Root({setIsRoot, setReqData, data}) {

  function clickHanlder(e) {
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
      <h2>Root: </h2> 
      <div>
        <button onClick={clickHanlder}>Query</button>
      </div>
      <div>
        <button onClick={clickHanlder}>Mutation</button>
      </div>
    </div>
  );
}

export default Root;