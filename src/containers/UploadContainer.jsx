import React from 'react';
import FileUpload from '../components/FileUpload';
import lion from '../assets/Lion100px.svg';


function UploadContainer() {
  return (
    <div className="upload-container py-20 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between">
        <img className="my-5 h-full w-full" src={lion} alt="logo" />
        <h2 className='text-4xl'>Let&apos;s get started!</h2>
      </div>
      <FileUpload />
    </div>
  );
}

export default UploadContainer;