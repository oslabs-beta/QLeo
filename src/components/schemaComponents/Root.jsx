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
      <div><h2>root query </h2> 
        <button onClick={clickHanlder}>Query</button>
        <button onClick={clickHanlder}>Mutation</button>
      </div>
    </div>
  );
}

export default Root;