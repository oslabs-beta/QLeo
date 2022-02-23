import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function FileUpload() {
  const [ packages, setPackages] = useState(false);
  const [schema, setSchema] = useState(false);
  const hiddenFileInput = useRef(null);

  // Handles file upload event and post request to server
  function handleUpload(event) {
    const pathName = event.target.files[0].path;

    if (pathName.includes('package')) {
      setPackages(!packages);
    } else {
      setSchema(!schema);
    }

    fetch('http://localhost:3000/upload/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pathName}),
    }
    ).then(res => res.json())
      .then(data => console.log(data));
  }

  // invokes file input tag through a ref
  const handleClick = _event => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="flex mt-10">
      <div className="flex flex-col items-center px-10 border-r border-bg-mirror">
        <p className='text-sm py-2 uppercase tracking-widest'>Step 1</p>
        <p className='text-xl py-2'>Upload your package.json</p>
        <input type="file" onChange={handleUpload} ref={hiddenFileInput} hidden/>
        <button 
          className="flex flex-col justify-center items-center mt-8 bg-btn-gray 
                           bg-gradient-to-r hover:from-left hover:to-right rounded-full 
                           h-24 w-24 cursor-pointer outline-none" 
          onClick={handleClick}>
          <FontAwesomeIcon icon={packages ? faCircleCheck : faUpload} size="lg" />
        </button>
      </div>

      <div className="flex flex-col items-center px-10">
        <p className='text-sm py-2 uppercase tracking-widest'>Step 2</p>
        <p className='text-xl py-2'>Upload your schema file</p>
        <input type="file" onChange={handleUpload} ref={hiddenFileInput} hidden/>
        <button  
          className="flex flex-col justify-center items-center mt-8 bg-btn-gray 
                           bg-gradient-to-r hover:from-left hover:to-right rounded-full 
                           h-24 w-24 cursor-pointer outline-none" 
          onClick={handleClick}>
          <FontAwesomeIcon icon={schema ? faCircleCheck : faUpload} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default FileUpload;