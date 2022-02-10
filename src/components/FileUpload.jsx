import React from 'react';

function FileUpload() {

  // Handles file upload event and updates state
  function handleUpload(event) {
    console.log(event.target);
    const pathName = event.target.files[0].path;


    fetch('http://localhost:3000/updateJson/', {
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
      <input type="file" onChange={handleUpload} />
    </div>
  );
}

export default FileUpload;