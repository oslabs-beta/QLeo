import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';

function UploadContainer() {
  return (
    <div className="upload-container">
      <FileUpload />
    </div>
  );
}

export default UploadContainer;