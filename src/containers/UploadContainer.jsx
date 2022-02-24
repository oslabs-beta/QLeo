import React from 'react';
import FileUpload from '../components/FileUpload';
import lion from '../assets/qleo-logo.png';


function UploadContainer({ schema, setSchema }) {
  return (
    <div className="upload-container py-20 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between">
        <img className="m-5 pr-8 pb-4 h-1/4 w-1/4" src={lion} alt="logo" />
        <h2 className='text-3xl mt-4'>Let&apos;s get started!</h2>
      </div>
      <FileUpload schema={schema} setSchema={setSchema} />
    </div>
  );
}

export default UploadContainer;