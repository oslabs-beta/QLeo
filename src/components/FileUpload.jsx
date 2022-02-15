import React from 'react';

function FileUpload() {

  // Handles file upload event and updates state
  function handleUpload(event) {
    console.log(event.target);
    const pathName = event.target.files[0].path;


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

  return (
    <div id="upload-box">
      <div className="input-box">
        <label htmlFor='package'>Package Json</label>
        <input type="file" onChange={handleUpload} />
      </div>
      <div className="input-box">
        <label htmlFor="schema">Schema</label>
        <input type="file" onChange={handleUpload} />
      </div>
    </div>
  );
}

export default FileUpload;